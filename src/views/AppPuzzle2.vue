<template>
  <div class="page-content">

<div style="position:absolute; height: 200px; width: 200px;" :style="dirtContainerStyle">
  <img v-if="count > 68" class="dirt" style="position:absolute; bottom:0px; left: 10px"  :src="dirtSrc"/>
  <img v-if="count > 25" class="dirt" style="position:absolute; bottom:0px; left: 40px"  :src="dirtSrc"/>
  <img v-if="count > 10" class="dirt" style="position:absolute; bottom:0px; left: 70px"  :src="dirtSrc"/>
  <img v-if="count > 85" class="dirt" style="position:absolute; bottom:40px; left: 30px"  :src="dirtSrc"/>
  <img v-if="count > 50" class="dirt" style="position:absolute; bottom:40px; left: 60px"  :src="dirtSrc"/>
  <img v-if="count > 99" class="dirt" style="position:absolute; bottom:80px; left: 40px"  :src="dirtSrc"/>
</div>


    <div style="display:grid; place-items:center">

      <p v-if="count-2 > 0" style="opacity: .25">Hit {{count-2}}{{exclamations(count-2)}} {{ getResponse(count-2) }}</p> <!-- Display the character's response here -->
      <p v-if="count-2 <= 0" style="opacity: .25"> </p> <!-- Display the character's response here -->
      <p v-if="count -1 > 0" style="opacity: .5">Hit {{count-1}}{{exclamations(count-1)}} {{ getResponse(count-1) }}</p> <!-- Display the character's response here -->
      <p v-if="count-1 <= 0" style="opacity: .25"> </p> <!-- Display the character's response here -->
      <p v-if="count">Hit {{count}}{{exclamations(count)}} {{ getResponse(count) }}</p> <!-- Display the character's response here -->
      <p v-if="checkCountIsNull" style="opacity: .25"> <!-- Display the character's response here --> </p>


      <img v-if="idle" class="character" src="../assets/digging/base_model.png" />
      <img v-if="digging" class="character" :src="diggingSrc" />

      <div style="position:relative;" :style="walkContainerStyle">
        <template v-if="walking">
          <img v-if="walkDelta > 0" :style="{left: positionX+'px'}"  class="character walking" src="../assets/digging/walk_right.gif"/>
          <img v-if="walkDelta < 0"  :style="{left: positionX+'px'}" class="character walking mirrored" src="../assets/digging/walk_right.gif" />
        </template>
      </div>

      <button @click="dig" :disabled="digging">{{buttonText}}</button>

      <div id="chatango-chatbox" :style="chatboxStyle">
        <!-- The chatbox will be loaded here -->
      </div>

    </div>

    <app-modal :puzzle-number="2" v-if="showModal" autofill-password="farmors love digging">
      <template #slot2>
        <p class="smaller-text">You have tilled the fields and found the treasure.</p>
        <p class="smaller-text">It took you <span style="font-weight:bold">{{count}}</span> tries.</p>
        <p class="smaller-text">You have solved the puzzle, enter your username for the leaderboard</p>
        <p class="smaller-text">Oh, you'll need this `farmors love digging`</p>
      </template>
  </app-modal>

  </div>

</template>

<script>
  import Cookies from 'js-cookie'
import AppModal from "../components/AppModal";

export default {
  components: {
    AppModal
  },
  computed: {
    isCountNull() {
      return this.count === null;
    },
    chatboxStyle(){
      const right = Math.max(0, this.windowWidth/4 - 200);
      const bottom = Math.max(0, this.windowHeight/2 - 200);
      return {'bottom': bottom + 'px', 'right': right + 'px'};
    },
    showModal(){

      let should_show_modal = (this.count > 100 && this.lastRandom < .002) || (this.count > 200 && this.lastRandom < .1);
      //should_show_modal = true
      if (should_show_modal) {
        // Store it,
        localStorage.setItem(`puzzle-${this.puzzleNumber}-showModal`, 'true');
        return true
      } else {
        let stored_show = localStorage.getItem(`puzzle-${this.puzzleNumber}-showModal`);
        if (stored_show == 'true') {
          return true
        }
      }
      return false
    },
    diggingSrc(){
      return require("@/assets/digging/digging.gif");
    },
    dirtSrc(){
      if (this.digging){
         return require("@/assets/digging/dig_4.gif");
      }else {
        return require("@/assets/digging/big_dirt.png");
      }
    },
    dirtContainerStyle(){
      return {left: this.windowWidth/2 - 200 + 'px', top: this.windowHeight/2 - 200 + 'px'};
    },
    walking(){
      return false
    },
    idle(){
      return !(this.digging || this.walking);
    },
    walkContainerStyle(){
     if (this.walking){
       return {height: '200px'}
     }
     return {};
    }
  },
  watch:{
    positionX(){
      const epsilon = 10;
      if (this.positionX < epsilon && this.walkDelta < 0){
        this.completedWalk = true;
      }
    }
  },
  data() {
    return {
      lastRandom: 1,
      buttonText: 'Dig',
      digging: false,
      text: '',
      delayBetweenDigs: 1000,
      count: 0,
      responses: [],
      response: '', // This will hold the character's response

      positionX: 0,
      walkDelta: 5, // Moving right, -1 for left
      maxAbsX: Math.min(Math.max(window.innerWidth/2 - 100, 100), 300),

      windowWidth: window.innerWidth,
      windowHeight: window.innerHeight,

      completedWalk: false,
    };
  },
  mounted() {
    this.parseCsv();

    const savedCount = Cookies.get('count');
    if (savedCount) {
      this.count = parseInt(savedCount, 10);
    }

    setInterval(() => {
      this.positionX += this.walkDelta;
      if (Math.abs(this.positionX) > this.maxAbsX){
        this.walkDelta *= -1;
      }
    }, 100);

    window.addEventListener('resize', () => {
      this.windowWidth = window.innerWidth;
      this.windowHeight = window.innerHeight
    });
    this.loadChatango();
  },
  methods: {
    updateCookie() {
      // Update the cookie to expire in 7 days
      Cookies.set('count', this.count, { expires: 7 });
    },
    loadChatango() {
      const script = document.createElement("script");
      script.setAttribute("id", "cid0020000371941782479");
      script.setAttribute("data-cfasync", "false");
      script.async = true;
      script.src = "//st.chatango.com/js/gz/emb.js";
      script.style = "width: 250px; height: 350px;";
      // Set the configuration as a JSON string
      script.innerHTML = JSON.stringify({
        handle: "farmorsdigging",
        arch: "js",
        styles: {
          a: "000000",
          b: 100,
          c: "FFFFFF",
          d: "FFFFFF",
          k: "000000",
          l: "000000",
          m: "000000",
          n: "FFFFFF",
          p: "10",
          q: "000000",
          r: 100,
          fwtickm: 1,
        },
      });

      // Append the script to the desired element
      document.getElementById("chatango-chatbox").appendChild(script);
    },
    exclamations: function(i){
      if (i % 10 == 0){
        return '!!!';
      }
      if (i % 5 == 0){
        return '!!';
      }
      return "!";
    },
    dig() {
      this.digging = true;
      this.count++;
      this.buttonText = 'Digging...';
      this.response = this.getResponse(this.count);
      this.lastRandom = Math.random();

      setTimeout(() => {
        this.digging = false;
        this.buttonText = 'Dig';
      }, this.delayBetweenDigs);
      this.updateCookie();
      this.fetchDiggingData();
    },

    async fetchDiggingData() {
      try {
        // Construct the URL with query parameters
        let url = `${this.$baseURL}/api/digging?dig_count=${this.count}`;
        // Perform the GET request
        let response = await this.$http.get(url);
        // Assuming the response contains JSON data, you might want to parse it
        // This step depends on how your $http client is configured and might be unnecessary
        let data = response.data;
        // Handle the response data here
        console.log(data);
        // Return the data in case you want to use it where the function is called
        return data;
      } catch (error) {
        // Handle any errors that occur during the request
        console.error('Error fetching digging data:', error);
        // Optionally, throw the error to be handled by the caller
        throw error;
      }
    },

    parseCsv() {
      // Assuming CSV data is stored in a string for demonstration
      const csvData = `
        dig_value,character_response
        1,This ground is firmer than expected.
        5,Feels like I'm hitting rocks every damn time.
        10,Why the hell won't this dirt budge?
        11,Oh look, I now have some soil.
        15,"Stubborn soil, just my luck."
        20,"Seriously, what's with this obstinate earth?"
        25,"Been at it for hours, barely a dent!"
        30,Are you kidding me?! This is absurd!
        35,I'm getting real tired of this nonsense.
        40,This is absolutely maddening!
        45,Screw this! I just want to dig a hole!
        50,"I swear, this ground hates me."
        60,I've had it up to here with this dirt!
        70,This is beyond frustrating.
        80,Why does everything have to be so difficult?!
        90,"I can't catch a break, can I?"
        100,"Just cooperate, you stupid dirt!"
        110,I'm starting to lose my patience.
        120,What's wrong with this freaking ground?!
        130,I'm about ready to give up.
        140,This is driving me insane!
        150,Unbelievable! Why won't it budge?!
        160,I'm so done with this crap.
        170,Piece of **** ground!
        180,I can't stand this anymore!
        190,This is utter bull****!
        200,I'm about to explode!
        210,God damn it! Why is it so hard?!
        220,I've had it up to here with this ****!
        230,"Why won't you just cooperate, you piece of ****?!"
        240,This is absolute horseshit!
        250,I'm losing my goddamn mind!
        260,What the **** is wrong with this ground?!
        270,"This is pure, unadulterated bull****!"
        280,F*** this! F*** everything!
        290,I'm about to lose my ****ing mind!
        300,I can't ****ing take it anymore!
        310,F*** this goddamn dirt!
        320,This is a ****ing nightmare!
        330,Why won't you just ****ing move?!
        340,I'm so ****ing sick of this ****!
        350,I'm about to go ****ing ballistic!
        360,F*** this ****ing shovel!
        370,Why won't anything ****ing work?!
        380,I'm so ****ing over this ****!
        390,I'm about to lose my ****!
        400,This is complete and utter ****ing madness!
        410,F***ity **** **** ****!
        420,I'm so ****ing done with this ****!
        430,I'm about to ****ing explode!
        440,"F*** this, I'm out!"
        450,I'm going to be here all day
        475,sun is going to go down soon
        500,god damnit did that just say 500?
        525,I don't even LIKE farms
        550,what am I digging for
        575,the reward better be really good
        600,I could be playing video games right now
        625,I could be trading jpegs on pallet right now
        650,I think the silo team hates me :(
        675,you've gotta be shittin' me…
        700,wow this sucks I'm going to go use cardano
        725,momma said diggin is the devil
        750,What is digging? What is a reward? What is life?
        775,There cannot POSSIBLY be more.
        800,IT'S OVER 9000!!!
      `;

      function stripQuotes(str) {
        return str.replace(/^"|"$/g, '');
      }

      // Split the CSV by new line and then each line by comma
      this.responses = csvData.trim().split('\n').slice(1).map(str => {
        // Split on first comma only
        const index = str.indexOf(",");
        const dig_value = str.substring(0, index);
        const character_response = str.substring(index + 1);

        return { dig_value: dig_value.trim(), character_response: stripQuotes(character_response.trim()) };
      });
    },
    getResponse(count) {
      // Find the matching response for the current count
      const match = this.responses.find(r => parseInt(r.dig_value) === count);
      return match ? match.character_response : '';
    },
  },
};
</script>

<style scoped>

.walking{
  position:absolute;
  height: 200px;
}
.page-content {
  background-image: url('../assets/digging/ground.png');
  background-size: cover;
  background-position: center;
  min-height: 100vh; /* Make sure it covers the full page */
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.mirrored {
  transform: scaleX(-1);
}

.character {
  /* Adjust as necessary for your design */
  max-height: 200px; /* Example size */
  margin: 0 auto; /* Center horizontally */
  z-index: 1;
}

button{
  border: 4px solid #333;
  padding: 4px;
  min-width: 100px;
  background-color: burlywood;
  font-weight: bold;
  transition: .2s ease all;

   text-shadow:
    -1px -1px 0 #fff,
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff; /* Shadow color */

}

button:hover{
  background-color: rosybrown;
}

p:not(.smaller-text){
  font-weight: bold;
  margin: 4px;
  word-wrap: break-word;
  color: #000;
  z-index: 1;

   text-shadow:
    -1px -1px 0 #fff,
     1px -1px 0 #fff,
    -1px  1px 0 #fff,
     1px  1px 0 #fff; /* Shadow color */

}

.dirt{
  height: 100px;
  width: 100px;
}

#chatango-chatbox {
  position: fixed;
  width: 250px; /* Adjust as necessary */
  height: 350px; /* Adjust as necessary */
  z-index: 1000; /* Ensures it stays on top of other content */
}

/* Media query for screens that are 768px wide or less */
@media (max-width: 768px) {
  #chatango-chatbox {
    display: none; /* Hide the chatbox on small screens */
  }
}

</style>