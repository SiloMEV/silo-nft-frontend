<template>
  <div>


<!--    <div class="content__places">-->
<!--      <div class="place">1st Place: <span>{{ firstPlace.username || 'Loading...' }}</span></div>-->
<!--      <div class="place">2nd Place: <span>{{ secondPlace.username || 'Loading...' }}</span></div>-->
<!--      <div class="place">3rd Place: <span>{{ thirdPlace.username || 'Loading...' }}</span></div>-->
<!--    </div>-->

<!--    <table class="content__table">-->
<!--      <tr>-->
<!--        <th>Username</th>-->
<!--        <th>Rank</th>-->
<!--        <th>Quest 1</th>-->
<!--        <th>Quest 2</th>-->
<!--        <th>Quest 3</th>-->
<!--        <th>Score</th> &lt;!&ndash; Assuming you want to display the score as well &ndash;&gt;-->
<!--      </tr>-->
<!--      &lt;!&ndash; Dynamically populate rows with data fetched from the API &ndash;&gt;-->
<!--      <tr v-for="(user, index) in rankings" :key="user.username">-->
<!--        <td>{{ user.username }}</td>-->
<!--        <td>{{ index + 1 }}</td>-->
<!--        <td>{{ user.puzzle_1_rank }}</td>-->
<!--        <td>{{ user.puzzle_2_rank }}</td>-->
<!--        <td>{{ user.puzzle_3_rank }}</td>-->
<!--        <td>{{ user.score }}</td> &lt;!&ndash; Displaying the score &ndash;&gt;-->
<!--      </tr>-->
<!--    </table>-->


  <div
    class="px-4 min-h-screen bg-gradient-to-b from-[#ECFBF4] to-[#F7F8F8] pb-20">
<!--    <header class="flex pt-12 pb-6 px-14">-->
<!--      <button-->
<!--        class="bg-green ml-auto font-bold text-xs rounded-3xl py-3 px-12 text-white">-->
<!--        Start Your Quest-->
<!--      </button>-->
<!--    </header>-->
    <div class="content overflow-hidden">
      <h1 class="text-2xl md:text-5xl text-darkgrey text-center">
        Silo NFT Launch
      </h1>
      <h2 class="mt-4 text-xl md:text-2xl text-center text-grey">
        Complete challenges in Silo’s 7-day quest to earn special prizes and
        access to Silo’s free community NFT mint
      </h2>
      <div class="container mt-9 py-4 px-8 text-darkgrey">

              <p><strong>What is this?</strong><br>
      Welcome to Silo’s NFT launch event! From 3/21/24 to 3/27/24, there will be seven quests, designed to test your wit, your mettle, and your ability to work together with the community.
      Each night at 10pm UTC, we’ll announce instructions for the next quest via our Twitter account.</p>
      <br>
      <p><strong>How to win:</strong><br>
      Complete the quest first to earn the highest score.
      Your rank will be determined by your average finishing place across all challenges.
      You compete as individuals but are highly encouraged to form teams. Working as part of a team will make you much more likely to succeed.</p>
      <br>
      <p><strong>What else should I know?:</strong><br>
      When puzzles are solved, the answer will be the same for everyone. <strong> Do not post the answer on twitter, discord, or otherwise share it. Any public dissmeniation (or pay-for-play) is grounds for disqualification. </strong> <br><br>
      Please lookout for phishing attacks. Any questions can be directed to one of our Community Mods (in discord) or DM to our twitter. We will never ask for seed phrases, for you to send funds to a wallet, or go to a page that is outside of the silostaking.io domain.<br>
      <br>
      </p>
      <p><strong>Rewards:</strong><br>
      The first, second, and third place will win special 1/1 pieces from the collection.<br>
      The top 150 ranks will earn a guaranteed spot in Silo’s NFT mint.<br>
      <br>The 🏆 symbol indicates top 50.<br><br>
      May the best farmors win! 🎉👨‍🌾</p>

<!--       <div class="content__buttons">
        <button @click="startPuzzle" class="content__button">Start Your Quest</button>
         <button v-if="!username" @click="registerNewUser" class="content__button content__button--register">
          Connect Discord
        </button>
        <button v-else :disabled="true" class="content__button content__button--register">
        </button>
      </div> -->
      </div>

      <!--   Top places   -->
      <div class="flex flex-wrap sm:flex-nowrap gap-4 mt-5 mb-8">
        <div class="place-container">
          <div class="top-place">
            <p class="place"><span class="text-xl">🥇</span> 1st Place</p>
            <p class="user">{{ firstPlace.username || 'Loading...' }}</p>
          </div>
        </div>
        <div class="place-container">
          <div class="top-place">
            <p class="place"><span class="text-xl">🥈</span> 2nd Place</p>
            <p class="user">{{ secondPlace.username || 'Loading...'}}</p>
          </div>
        </div>
        <div class="place-container">
          <div class="top-place">
            <p class="place"><span class="text-xl">🥉</span> 3rd Place</p>
            <p class="user">{{ thirdPlace.username || 'Loading...' }}</p>
          </div>
        </div>
      </div>

      <!--   Table   -->
      <div class="overflow-x-auto">
        <div class="container py-2 px-3 min-w-[640px]">
          <div class="relative mb-2">
            <search-icon
              class="absolute top-1/2 -translate-y-1/2 left-2 w-4 h-4" style="position:relative; top: 22px; right: 8px"/>
            <input
              v-model="searchTeamValue"
              placeholder="filter by farmor"
              class="outline outline-semigrey rounded-lg pl-8 py-1 text-xs text-darkgrey" />
          </div>

          <div
            class="table-header grid grid-cols-9 gap-4 text-xs text-semigrey text-center whitespace-nowrap mb-1" >
            <!-- Table Header -->
            <div class="cell cursor-pointer w-16" @click="sortHandler('rank')">
              <span>Rank</span>
                <sort-arrows
                  field="rank"
                  :activeField="activeField"
                  :order="sortOrder"/>
            </div>
            <div class="cell">Farmor</div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_1')">
              <span>1</span>
              <sort-arrows
                field="quest_1"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_2')">
              <span>2</span>
              <sort-arrows
                field="quest_2"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_3')">
              <span>3</span>
              <sort-arrows
                field="quest_3"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_4')">
              <span>4</span>
              <sort-arrows
                field="quest_4"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_5')">
              <span>5</span>
              <sort-arrows
                field="quest_5"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_6')">
              <span>6</span>
              <sort-arrows
                field="quest_6"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
            <div class="cell cursor-pointer" @click="sortHandler('quest_7')">
              <span>7</span>
              <sort-arrows
                field="quest_7"
                :activeField="activeField"
                :order="sortOrder" />
            </div>
          </div>

          <!-- Table Body -->
          <template v-for="player in sortedTeam" :key="player.username">
            <div
              class="table-row grid grid-cols-9 gap-4 text-xs text-hgrey text-center">
              <div class="cell w-16">{{ player.rank }}</div>
              <div class="cell">{{ player.username }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_1) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_2) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_3) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_4) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_5) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_6) }}</div>
              <div class="cell">{{ getQuestOutput(player.quest_7) }}</div>
            </div>
          </template>
        </div>
      </div>
    </div>
  </div>

  </div>
</template>


<script lang="ts">
import { defineComponent } from 'vue';
import SearchIcon from '@/components/Icons/SearchIcon.vue';
//import { EQuestStatus, type Player, type TQuestStatus } from '@/types';
import SortArrows from '@/components/SortArrows.vue';
import { orderBy } from 'lodash';
//import { generateRandomPlayersArray } from '@/utils';
//import {TQuestStatus} from "../types";

// type TActiveField =
//   | 'quest_1'
//   | 'quest_2'
//   | 'quest_3'
//   | 'quest_4'
//   | 'quest_5'
//   | 'quest_6'
//   | 'quest_7';
//
// interface DataTypes {
//   playersArray: Player[] | [];
//   searchTeamValue: string;
//   activeField: TActiveField;
//   sortOrder: '' | 'asc' | 'desc';
// }
// interface Player {
//   username: string;
//   rank: number;
//   quest_1: TQuestStatus;
//   quest_2: TQuestStatus;
//   quest_3: TQuestStatus;
//   quest_4: TQuestStatus;
//   quest_5: TQuestStatus;
//   quest_6: TQuestStatus;
//   quest_7: TQuestStatus;
// }

const EQuestStatus = {
  Complete: 'Complete',
  Top50: 'Top50',
  Bronze: 'Bronze',
  Silver: 'Silver',
  Gold: 'Gold'
};

function getMedalStatus(place) {
    if (place == 1) {
        return EQuestStatus.Gold;
    } else if (place == 2) {
        return EQuestStatus.Silver;
    } else if (place == 3) {
        return EQuestStatus.Bronze;
    } else if (place <= 50) {
      return EQuestStatus.Top50;
    } else if (place > 0) {
      return EQuestStatus.Complete;
    }
}


export default defineComponent({
  components: { SortArrows, SearchIcon },
  mounted() {

    // Check for 'code' in the URL when the component mounts
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      this.handleAuthentication(code);
    }

    this.fetchRankings();

    // todo Replace mock data with real data
    // this.playersArray = generateRandomPlayersArray(20);
  },
  data(){
    return {
      rankings: [], // Initialize rankings as an empty array
      username: '',


      playersArray: [],
      searchTeamValue: '',
      activeField: 'rank',
      sortOrder: 'desc'
    };
  },
  computed: {
    filteredTeam() {
      const searchTeamLower = this.searchTeamValue.toLowerCase();
      return this.playersArray.filter((player) =>
        player.username.toLowerCase().includes(searchTeamLower)
      );
    },
    sortedTeam() {
      if (this.activeField && this.sortOrder) {
        console.log(this.activeField)
        const questOrder = {
          Gold: 4,
          Silver: 3,
          Bronze: 2,
          Complete: 1
        };
        if (this.activeField == 'rank') {
          return orderBy(
            this.filteredTeam,
            [
              (player) => {
                return player['rank'];
              }
            ],
            [this.sortOrder === 'asc' ? 'desc' : 'asc']
          );
        } else {
          return orderBy(
            this.filteredTeam,
            [
              (player) => {
                const activeField = this.activeField;
                const questStatus = player[activeField];
                return questOrder[questStatus];
              }
            ],
            [this.sortOrder === 'asc' ? 'desc' : 'asc']
          );
        }
      }

      return this.filteredTeam;
    },
    firstPlace() {
      return this.rankings[0] || {};
    },
    secondPlace() {
      return this.rankings[1] || {};
    },
    thirdPlace() {
      return this.rankings[2] || {};
    },
  },
  methods: {
    startPuzzle() {
      window.location.pathname =  '/puzzle1';
      //window.location.href = 'http://example.com'; // Replace with your target URL
    },
    async fetchRankings() {
      try {
        const response = await this.$http.get(`${this.$baseURL}/api/rankings`);
        let temp_rankings = response.data;
        console.log(this.rankings)

        this.rankings = temp_rankings.sort(function(first, second) {
         return second.score - first.score;
        });

        let mockArray = [];

        // Generate player objects
        for (let i = 0; i < this.rankings.length; i++) {
          const player = {
            username: this.rankings[i]['username'],
            rank: i + 1,
            quest_1: getMedalStatus(this.rankings[i]['puzzle_1_rank']),
            quest_2: getMedalStatus(this.rankings[i]['puzzle_2_rank']),
            quest_3: getMedalStatus(this.rankings[i]['puzzle_3_rank']),
            quest_4: getMedalStatus(this.rankings[i]['puzzle_4_rank']),
            quest_5: getMedalStatus(this.rankings[i]['puzzle_5_rank']),
            quest_6: getMedalStatus(this.rankings[i]['puzzle_6_rank']),
            quest_7: getMedalStatus(this.rankings[i]['puzzle_7_rank'])
          };
          mockArray.push(player);
        }

        this.playersArray = mockArray;
        console.log(this.playersArray);
      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    },
    registerNewUser() {
      // Step 1: Redirect to Discord OAuth URL if 'code' is not present in URL
      const oauthState = this.generateRandomString();
      localStorage.setItem('oauth-state', oauthState);

      const baseUrl = `${window.location.protocol}//${window.location.host}`;

      // The state parameter, encoded in Base64 for the OAuth state parameter
      const encodedState = encodeURIComponent(btoa(oauthState));

      // The scopes you're requesting from Discord
      const scope = 'identify';

      // Construct the full Discord OAuth URL, encoding only necessary parts
      const discordAuthUrl = `https://discord.com/oauth2/authorize?client_id=${this.$discordClientId}&response_type=code&redirect_uri=${encodeURIComponent(baseUrl)}&scope=${encodeURIComponent(scope)}&state=${encodedState}`;

      window.location.href = discordAuthUrl;
    },
    generateRandomString() {
      let randomString = '';
      const randomNumber = Math.floor(Math.random() * 10);

      for (let i = 0; i < 20 + randomNumber; i++) {
        randomString += String.fromCharCode(33 + Math.floor(Math.random() * 94));
      }

      return randomString;
    },
    handleAuthentication(code) {
      console.log("Code for server exchange", code);
      this.getDiscordUserInfo(code);
    },
    getDiscordUserInfo(code) {
      // Your server-side endpoint that handles the OAuth code-to-token exchange and user info retrieval
      console.log("Querying server for", code, this.$baseURL)

      const cur_url = `${window.location.protocol}//${window.location.host}`;

      console.log("Current url", cur_url)
      console.log(this.$callbackURLDict);

      let url_code = this.$callbackURLDict[cur_url];

      console.log("URl code", url_code);

      let query_url = `${this.$baseURL}/api/auth/discord/callback?code=${encodeURIComponent(code)}&puz6=false&url=${url_code}`;

      console.log("Querying", query_url)

      fetch(query_url)
        .then(response => response.json())
        .then(data => {
          console.log("Got data from callbacK")
          console.log(data)
          // Assuming the server responds with the user's Discord username and discriminator
          if (data.username) {
            this.username = data.username
            console.log("setting user data to")
            console.log(this.username);
          } else {
            console.log("Invalid discord code")
          }
        })
        .catch(error => console.error('Error fetching user info:', error));
    },

    getQuestOutput(status) {
      // console.log(status);
      // return '🥇';

      switch (status) {
        case EQuestStatus.Gold:
          return '🥇';
        case EQuestStatus.Silver:
          return '🥈';
        case EQuestStatus.Bronze:
          return '🥉';
        case EQuestStatus.Top50:
          return '🏆';
        case EQuestStatus.Complete:
          return '✔️'; // EQuestStatus.Complete;
        default:
          return '';
      }
    },
    sortHandler(fieldName) {
//      let sortOrder = ''; // 'asc' | 'desc' = '';
      let sortOrder = '';

      if (this.activeField === fieldName) {
        if (this.sortOrder === 'desc') sortOrder = 'asc';
        if (this.sortOrder === 'asc') sortOrder = 'desc';
//        if (this.sortOrder === 'desc') sortOrder = '';
      }

      if (this.activeField !== fieldName) {
        this.activeField = fieldName;
        sortOrder = 'asc';
      }

      this.sortOrder = sortOrder;
    }
  }
});
</script>



<style scoped>
.table-header .cell {
  @apply col-span-1 flex items-center justify-center select-none;
}

.table-row .cell {
  @apply col-span-1 py-1.5;
}

.table-row:nth-child(odd) {
  background-color: #F9FAFB;
}

.content {
  max-width: 768px; /* Approximation of 'max-w-screen-md' */
  margin-left: auto;
  margin-right: auto;
}

.container {
  border-radius: 0.5rem; /* 'rounded-lg' */
  background-color: white; /* 'bg-white' */
  border: 2px solid lightgrey; /* 'border', 'border-2', and 'border-lightgrey' */
}

.place-container {
  padding-top: 0.5rem; /* 'py-2' */
  padding-bottom: 0.5rem;
  width: 100%; /* 'w-full' */
  border-radius: 0.5rem; /* 'rounded-lg' */
  border: 1px solid #aaa; /* 'border', 'border-green' */
  background-color: white; /* 'bg-white' */
}

.place-container .top-place {
  display: flex;
  flex-direction: column; /* 'flex-col' */
  gap: 0.25rem; /* 'gap-1', approximation */
  align-items: center; /* 'items-center' */
}

.place-container .top-place p.place {
  max-width: max-content; /* 'w-max' */
  font-size: 1rem; /* 'text-base', approximation */
  color: darkgrey; /* 'text-darkgrey' */
  border-bottom: 2px solid darkgrey; /* 'border-b-2', 'border-darkgrey' */
}

.place-container .top-place p.user {
  max-width: max-content; /* 'w-max' */
  font-size: 0.75rem; /* 'text-xs', approximation */
  color: blue; /* 'text-blue' */
  border-bottom: 1px solid blue; /* 'border-b', 'border-blue' */
  cursor: pointer; /* 'cursor-pointer' */
}


.content {
  padding: 7rem 2rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.content__title {
  text-align: center;
  font-size: 3rem; /* Adjust font size here */
  font-weight: bold; /* Make it bolder */
}
.content__title, .content__subtitle, .content__box h3 {
  text-align: center;
}
.content__box {
  background-color: white;
  padding: 2rem;
  margin: 1rem 0;
  width: 80%;
  box-shadow: 0 4px 6px rgba(0,0,0,0.1);
}

.content__button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  white-space: nowrap;
  border-radius: 9999px; /* rounded-full */

  margin-top: 1rem;
  padding: 0.5rem 1rem;
  background-color: limegreen;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 30px; /* Adjust this value to control the roundness */
  font-size: 0.875rem; /* text-sm */
  font-weight: 500; /* font-medium */
  ring-offset-color: white;
  transition: color .15s ease-in-out;
  outline: none;
  --tw-ring-offset-width: 2px;
  --tw-ring-opacity: 1;
  opacity: 1; /* For enabled state */
  pointer-events: auto; /* For enabled state */

  /*#//text-white bg-primary hover:bg-primary/90
  h-10 px-4 py-2*/

  /*//--color-primary: #2563eb; /* Example primary color
  --color-primary-hover: rgba(37, 99, 235, 0.9);*/

  height: 2.5rem; /* h-10 */
  padding: 0.5rem 1rem; /* px-4 py-2 */

}


.content__buttons {
  display: flex;
  justify-content: center;
  gap: 1rem; /* This creates space between the buttons */
}

/* Optional: Specific styles for the register button, if you want it to stand out */
.content__button--register {
  background-color: #007bff; /* Example: a blue color */
  color: white;
}

.content__button:focus-visible {
  outline: none;
  box-shadow: 0 0 0 2px rgba(156, 163, 175, 0.5); /* ring-gray-950, assuming gray-950 is #9ca3af */
}
.content__button:disabled {
  pointer-events: none;
  opacity: 0.5;
}


.top-place{
  width: 200px;
  margin: 0 auto;
}
</style>
