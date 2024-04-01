<template>


<div>
<div class="grid" style="grid-template-rows: auto auto 1fr; height: 100vh">

  <div class="left">
      <p style="font-weight: bold; margin-bottom: 16px" v-html="text"></p>
  </div>

  <div></div>

  <div class="left" v-if="!text.includes('You have died. Maybe try again.')">
      <p >Your choices: </p>
      <div class="choice" :class="{ disabled: !isValidMove(moves[move][0]), white: isWhite}" v-for="move in possibleMoves" :key="move.key" @click="onMoveSelected(moves[move][0])">
        {{ moves[move][1] }} [{{ displayImpacts(moves[move][2])}}] {{progressAnimation}}
      </div>
  </div>

  <div class="right">
  <div v-if="Object.keys(currentStats).length > 0">
    <p >You got:</p>
    <ul>
      <li v-for="(value, key) in currentStats" :key="key">{{ key }}: <span style="font-weight:bold">{{ value }}</span></li>
    </ul>
  </div>
</div>




<a class="left" style="font-size:10px; color: #bbb; align-self: end; margin-bottom: 16px" href="http://game.notch.net/drowning/">Inspired by Drowning in Problems</a>

</div>

<app-modal :puzzle-number="7" v-if="isDone" title="You have explored the world!">
  <p class="smaller-text">You explored the world, Farmor, and lived a fulfilling life that of love, friends, and happiness!</p>
    <br>
    <p class="smaller-text">farmors are f<u>amil</u>y. (pws: `farmors are family`) </p>
</app-modal>


</div>
</template>


<style scoped>

.grid{
  display:grid; grid-template-columns: auto 200px; padding-top: 100px; column-gap: 20px;
}

.left{
  padding-left: 100px
}

.choice{
  text-decoration: underline;
  cursor: pointer;
  color: #333;

  transition: 1s ease color;
}

.disabled{
  color: #bbb;
  text-decoration: line-through;
}

.choice.disabled{
  cursor: not-allowed;
}

.choice:not(.disabled):hover{
  /*color: limegreen;*/
  font-weight:bold;
}

p{
  margin: 8px 0;
}

.white{
  color: #fff;
}

@media (max-width: 768px) {
.left {
  padding-left: 16px;
}

.grid{
  grid-template-columns: auto 100px;
}
}
</style>


<script>

import AppModal from "../components/AppModal";

const MAX_DAYS = 50

//const CHARACTER_BUFFER = 30

// key : hotkey, description, impacts, reqs_to_show

const moves = {
// Tier zero - start
//    'birth': ['i', "Birth", {"Days": 1, "Kid": 1}, [["Days", "<", 1]]],
// Tier one - kid
    'play': ['p', 'Play', {'Happiness': 1, "Days": 1}, [['Days', '>=', 0], ['Days', '<', 37]]],
    'explore': ['e', 'Explore', {'Confident': 1, "Days": 1}, [['Days', '>=', 0], ['Days', '<', 37]]],

    'neighbors-birth': ['n', 'Smile at the neighbors', {'Friends': 1, 'Days': 1, "Confident": -2}, [["Confident", ">", 0], ["Old", "<", 1], ["Adult", "<", 1]]],

// Tier two - child [after 10 days], could make these multiples of the above, but maybe first two are begnin.
    'child': ['i', "Grow up to a Child", {"Kid": -1, "Child": 1}, [["Days", ">", 10], ["Kid", ">", 0]]],
    'farm-child': ['w', 'Farm the field', {'Money': 1, 'Days': 1}, [["Child", ">", 0], ['Days', '<', 37]]],

// Tier three - teenager [after 20 days]
    "adult": ['i', 'Grow up to an adult', {"Adult": 1, "Child": -1}, [["Days", ">", 20], ["Child", ">", 0]]],
    'farm-adult': ['w', 'Work the field', {'Money': 2, 'Days': 1}, [["Adult", ">", 0], ['Days', '<', 37]]],
    'neighbors-adult': ['n', 'Talk to the neighbors', {'Friends': 1, 'Days': 1}, [["Adult", ">", 0], ["Days", "<", 37]]],



    'travel': ['t', 'Travel', {'Money': -2, 'Confident': 2, "Days": 1}, [["Days", '>', 20], ['Money', '>', 0], ['Days', '<', 37]] ],
//    'relax': ['r', "Relax", {"Days": 1, "Stress": -1}]

    "old": ['i', 'Become old', {"Old": 1, "Adult": -1}, [["Days", ">", 36], ["Adult", ">", 0]]],

    'farm-old': ['w', 'Toil the field', {'Money': 1, 'Days':2}, [["Old", ">", 0]]],
    'neighbors-old': ['n', 'Reminisce with the neighbors', {'Friends': 1, 'Days': 1, 'Energy': -1}, [["Old", ">", 0], ["Energy", ">", 0]]],
    'play-old': ['p', 'Struggle to Play', {'Happiness': 1, "Days": 1, 'Energy': -1}, [["Old", ">", 0], ["Energy", ">", 0]]],
    'explore-old': ['e', 'Go for a slow walk', {'Confident': 1, "Days": 1, 'Energy': -1}, [["Old", ">", 0], ["Energy", ">", 0]]],


// Global Actions


    'gift': ['g', 'Give a gift', {'Money': -1, 'Friends': 1}, [['Money', ">", 0]]],
    'ask out': ['a', 'Ask out a romantic interest', {'Romance': 1, 'Friends': -10}, [['Days', '>', 10], ['Friends', '>', 0]]],
    'buy stuff': ["b", "Buy Stuff", {"Money": -1, "Stuff": 1}, [["Money", ">", 0]]],
    'pass_things_down': ['p', "Pass things to kids", {"Stuff": -10, "Fullfillment": 1}, [["Kids", ">", 0]]],

    'travel_with_dog': ['o', 'Travel with Dog', {'Money': -3, 'Confident': 5, "Days": -1}, [["Dogs", ">", 0], ["Money", ">", 0]]],


    'rest': ['r', 'Eat', {"Money": -1, "Energy": 1}, [["Money", ">", 0]]],

    'marry': ['m', "Marry", {"Romance": -2, "Married": 1}, [["Romance", ">", 0]]],

    'have_kids': ['k', 'Have Kids', {'Kids': 1, 'Energy': -10}, [["Old", "<", 1], ['Married', ">", 0], ["Energy", ">", 3]]],
    'have_dogs': ['d', 'Have Dogs', {'Dogs': 1, 'Energy': -5}, [['Married', ">", 0], ["Energy", ">", 0]]],
    'sell_stuff': ['s', 'Sell Stuff', {'Stuff': -2, 'Money': 1}, [["Stuff", ">", 0]]]
 
}

//const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

export default {
  name: "AppPuzzle7",
  components: {
    AppModal
  },
  data() {
    return {
      isWhite: false,
      isDone: false,
      movesDone: [],

      currentStats: {"Days": 0, "Kid": 1},
      moves: moves,

      text: '',
      progressAnimation: '',

//      transitioning: false,
    };
  },
  computed: {
    userScore(){
      return Math.floor((this.movesDone.length / Object.keys(moves).length) * 100);
    },
   possibleMoves() {
    let result = [];
    Object.keys(this.moves).forEach((name) => {
      const move = this.moves[name];
      if (this.isVisibleMove(move)) {
        result.push(name);
      }
    })
    return result;
  },

   possibleMovesDict(){
    return this.possibleMoves.reduce((acc, moveKey) => {
      acc[moveKey] = moves[moveKey];
      return acc;
    }, {});
   }


  },
  mounted(){
    this.day();
    let stored_pass = localStorage.getItem(`puzzle-${this.puzzleNumber}-showModal`);
    if (stored_pass == 'true') {
      this.isDone = true;
    }

  },
  methods: {

    isVisibleMove(move){
      // Get the requirements
      const reqs = move[3];
      let allReqsPassed = true;
      for (const req of reqs) {
        const [stat, operation, amount] = req;
        if (operation === '>') {
          if ((this.currentStats[stat] || 0) > amount) {
            // pass
          } else {
            allReqsPassed = false;
            break; // Exit the loop if any requirement fails
          }
        } else if (operation === '<') {
          if ((this.currentStats[stat] || 0) < amount) {
            // pass
          } else {
            allReqsPassed = false;
            break; // Exit the loop if any requirement fails
          }
        }
      }
      // console.log('move', move[1], 'validity', allReqsPassed);
      return allReqsPassed;
    },

 getFromDict(hotkey){

  // eslint-disable-next-line no-unused-vars
 for (const [key, value] of Object.entries(this.possibleMovesDict)) {
    if (value[0] === hotkey) {
      // Do the stats
      return value;
    }
  }
 },

 executeMove(hotkey) {
  // Do the moves.
  // Return true if did it, false if failed.
  // eslint-disable-next-line no-unused-vars
  for (const [key, value] of Object.entries(this.possibleMovesDict)) {
    if (value[0] === hotkey) {
      // Do the stats
      for (const [statKey, statValue] of Object.entries(value[2])) {
        this.currentStats[statKey] = (this.currentStats[statKey] || 0) + statValue;
      }
      return true;
    }
  }
  return false;
},

// This function should be called when a move is attempted, e.g., a button for a move is clicked
 async onMoveSelected(hotkey) {
  if (hotkey === "q") {
    this.text = "You throw it in.";
    // Handling quitting the game, possibly resetting state or redirecting the user
    return;
  }

  if (this.isValidMove(hotkey)) {
    const moveItem = this.getFromDict(hotkey);

    // // Add in the delay
    // this.progressAnimation = '.'
    // setTimeout(() => { this.progressAnimation = '..'}, 200);
    // setTimeout(() => { this.progressAnimation = '...'}, 400);
    // setTimeout(() => { this.progressAnimation = '....'}, 600);
    // setTimeout(() => { this.progressAnimation = ''}, 1000);
    // await wait(1400);

    if (!this.movesDone.includes(moveItem)) {
      this.movesDone.push(moveItem);
      // console.log("New items!")
      // console.log(this.userScore);
      if (this.userScore >= 75) {
        localStorage.setItem(`puzzle-${this.puzzleNumber}-showModal`, 'true');
        this.isDone = true;
      }
    }

    this.executeMove(hotkey, this.possibleMovesDict); // Assuming executeMove updates the game state based on the move

    this.day();

    this.isWhite = true;
    setTimeout(() => {
      this.isWhite = false;
    }, 1000);

  }
},

isValidMove(hotkey){
  //console.log(hotkey)
  const moveItem = this.getFromDict(hotkey);
  // console.log('moveItem', moveItem);

  if (!moveItem) return; // Move not found or not possible

  let requirements_dict = moveItem[2];

  let canMakeMove = true;

  Object.entries(requirements_dict).forEach(([req, amount]) => {
    if (((this.currentStats[req] || 0) + amount) <= -1) {
      canMakeMove = false
    }
  });
  return canMakeMove
},


 displayImpacts(impacts) {
  let response = "";
  for (const [key, value] of Object.entries(impacts)) {
    const sign = value < 0 ? "" : "+";
    response += `${key} ${sign}${value}, `;
  }
  if (response.length > 0) {
    response = response.slice(0, -2); // Remove the last comma and space
  }
  return response;
},

//  displayOption(option) {
//   // Assuming `option` is an array with the structure [hotkey, description, impacts]
//   console.log(`[${option[0]}] ${option[1]} \t ${this.displayImpacts(option[2])}`);
// },

 // displayOptions(options) {
 //  // Assuming `options` is an array of keys that exist in the `moves` object
 //  // And `moves` is an object where each key maps to an array representing an option
 //  options.forEach(optionKey => {
 //    const option = moves[optionKey];
 //    this.displayOption(option);
 //  });
// },

 iterateMove() {
  // Clean 0s from current stats
  Object.keys(this.currentStats).forEach(key => {
    if (this.currentStats[key] === 0) {
      delete this.currentStats[key];
    }
  });

//  console.log(this.currentStats);


  // Assuming displayOptions is a function that takes possibleMoves and displays them to the user
//  this.displayOptions(this.possibleMoves);

  // Handling user input through UI instead of synchronous input like Python's input()
  // This could be implemented with event listeners on buttons representing each move
  // You have explored {{userScore}}% of what life has to offer.
},



 day() {
  if (this.currentStats['Days'] === 37) {
    console.log("You start to feel slower..");
  }

  if (this.currentStats['Days'] <= 4) {
    this.text = `Welcome to quest 7 farmors! Every day, we have to wake up and decide what we’re going to do with our lives. Our choices stack up to make us who we are. \n\n
<br>
<br>
What kind of life will you live, Farmor? A fulfilling one? Use your choices below to show us what being a Farmor is all about. Note: If you refresh this page, you will reset the game. <br>` + `<br>You wake up on the farm.` + `<br><br>You have explored ${this.userScore}% of what life has to offer.`;
    //this.text = `You wake up bright as a kid.`;
  } else {
    this.text = `You wake up on the farm.` + `<br><br>You have explored ${this.userScore}% of what life has to offer.`;
  }

  if (this.possibleMoves.length === 0) {
    this.text = `You have nothing else you can do. You die early with: ${JSON.stringify(this.currentStats)}`;
    return; // Adjust according to how you manage game over in your JS environment
  }
  console.log(MAX_DAYS)
  console.log(this.currentStats['Days'])

  if (this.currentStats['Days'] > MAX_DAYS) {
    this.text = `You have died. Maybe try again.` + `<br><br>You have explored ${this.userScore}% of what life has to offer.`;
    console.log("THIS IS THE END OF DAYS")
    return; // Adjust accordingly
  }

  this.iterateMove(); // Make sure this function is adapted to handle user interactions appropriately
}

  },
};
</script>