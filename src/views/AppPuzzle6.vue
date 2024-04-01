<template>
<div>



<div style="max-width: 800px; margin: 0 auto; padding: 16px; padding-top: 100px;">
<h1>Sei NFT Projects Staking Competition</h1>
<h2>Which community supports Silo the most? Insert your address and twitter handle below to show your support.</h2>

<p style="font-weight:bold">
Note for privacy: All data will be shown in aggregate+anonymized fashion. We’ll delete all data from this competition after it concludes. We have no interest in examining / doxxing wallets. 
</p>

<div class="container mt-9 py-4 px-8 text-darkgrey">

  <p>

  This event has concluded. We’re counting how much iSEI each NFT community holds. If your wallet contains iSEI and NFTs from multiple collections, your iSEI will count toward the score of each collection in your wallet. Members of the winning community will receive a rankings boost on the leaderboard for The Farmors Launch Event.

  </p>



    <div class="content__buttons">
      <!-- Uncomment this section to allow wallet submission.-->
      <!-- <button v-if="!username" @click="registerNewUser" class="content__button content__button--register">
          Connect Discord
      </button>
      <button v-else :disabled="true" class="content__button content__button--register">
      </button>
      <button :disabled="!username" @click="storeDataAndNavigate" class="content__button">Register your Address</button>

      <div class="status-box" :class="{ 'text-success': userSubmitted, 'text-not-linked': !userSubmitted }">
      </div> -->

    </div>
</div>

<div class="container mt-9 py-4 px-8 text-darkgrey" id="chartContainer">

<section>
<div class="chart" :style="chartStyle">

  <span class="chart-header" style="grid-column: span 2">NFT Collection</span>
  <div class="chart-header" style="text-align: center; width:100%">SEI Staked with Silo by Community</div>

  <template v-for="entry in leaderboard" :key="entry.name">
  <img class="logo" :src="entry.image">
  <div class="groupName">{{entry.name}}</div>
<!--  <div><div class="bar" :style="barStyle(entry)"></div> <span class="staked">{{Math.round(entry.staked*animation)}}</span></div>-->
  <div><div class="bar" :style="barStyle(entry)"></div> <span class="staked">{{computePercentage(entry.staked)}}%</span></div>

  </template>
</div>
</section>

</div>

</div>
  </div>

</template>

<style scoped>

.status-box {
  align-items: center; /* Center vertically */
  justify-content: center; /* Center horizontally, if desired */
  display: inline-flex;
  white-space: nowrap;

  margin-top: 1rem;



  margin-left: 20px;
  font-size: 0.75rem; /* Adjust the font size to be a bit smaller */
  width: auto; /* Adjust width as needed */
}

/* Styles for when the wallet is linked */
.text-success {
  color: limegreen; /* Match the enabled button color */
}

/* Styles for when the wallet is not linked */
.text-not-linked {
  color: #007bff; /* Match the register button color */
}

h1{
  font-size: 3em;
  text-align: center;
}

h2{
  font-size: 1.5em;
  text-align: center;
}
.bar{
  height: 30px;
  background-color: limegreen;
  transition: 1s ease width;
  display: inline-block;
  border: 2px solid #084f08;
}

.chart{
  margin-top: 24px;
  display: grid;
  grid-gap: 8px;
  grid-template-columns: auto 100px 1fr;
/*  border: 1px dashed greenyellow;
  padding: 16px;
*/}

  .chart-header{
    font-weight: bold;
  }

.groupName{
  color: #555;
  position: relative;
  top: 4px;
}
.staked{
  font-size: 14px;
  color: #555;
  position:relative;
  top: -12px;
}
p{
  margin: 8px 0;
}

.logo{
  height: 32px;
  width: 32px;

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

.container {
  border-radius: 0.5rem; /* 'rounded-lg' */
  background-color: white; /* 'bg-white' */
  border: 2px solid lightgrey; /* 'border', 'border-2', and 'border-lightgrey' */
}

</style>



<script>


function lerp(x, a, b, c, d) {
      const scale = (x - a) / (b - a);
      return (d - c) * scale + c;
    }

const begin_leaderboard = [
        {name: 'Seiyans', staked: 100, image: require("@/assets/nfts/logo-seiyans.png")},
{name: 'The Colony', staked: 100, image: require("@/assets/nfts/logo-thecolony.png")},
{name: 'WeBump', staked: 100, image: require("@/assets/nfts/logo-webump.png")},
{name: 'Dob', staked: 100, image: require("@/assets/nfts/logo-dob.png")},
{name: 'Yaka Voyager', staked: 100, image: require("@/assets/nfts/logo-yaka.png")},
{name: 'Cappys', staked: 100, image: require("@/assets/nfts/logo-cappys.png")},
{name: 'Outlines', staked: 100, image: require("@/assets/nfts/logo-outlines.png")},
{name: 'Seiyan by Cult', staked: 100, image: require("@/assets/nfts/logo-seiyan-by-cult.png")},
{name: 'Seilors', staked: 100, image: require("@/assets/nfts/logo-seilors.png")},
{name: 'Alive1111', staked: 100, image: require("@/assets/nfts/logo-alive1111.png")},
{name: 'Sei Fuckers', staked: 100, image: require("@/assets/nfts/logo-seifuckers.png")},
{name: 'Seimen', staked: 100, image: require("@/assets/nfts/logo-seimen.png")},
{name: 'The Sei Whales', staked: 100, image: require("@/assets/nfts/logo-seiwhales.png")},
];


function updateLeaderboard(leaderboard, counts) {
  return leaderboard.map(entry => ({
    ...entry,
    // Set staked to 0 if not found in counts, otherwise update with the value from counts
    staked: counts[entry.name] ? parseInt(counts[entry.name], 10) : 0.00001,
  }));
}


export default {
  name: "AppPuzzle6",
  // components: {
  //   AppModal
  // },
  computed: {
    maxStaked(){
      return this.leaderboard[0].staked;
    },
    chartStyle(){
      return {
        width: this.chartWidth + 'px'
      }
    },
    chartWidth(){
      return this.windowWidth*this.animation
    }
  },
  mounted(){
    // this.leaderboard.forEach((entry) => {
    //   let staked = entry.staked;
    //   entry.staked = 0;
    //   setTimeout(() => {
    //     entry.staked = staked;
    //   }, 1500);
    // });
    let right_buffer = 100;
    this.windowWidth = document.getElementById('chartContainer').offsetWidth - right_buffer;

    window.addEventListener('resize', () => {
      this.windowWidth = document.getElementById('chartContainer').offsetWidth - right_buffer;
      console.log(this.windowWidth);
      //this.windowWidth = window.innerWidth;
    });

    setInterval(() => {
      this.animation = Math.min(1, this.animation + .1);
    }, 30);

    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      this.handleAuthentication(code);
    }

    this.fetchNFTRankings();

    this.fetchUserSubmitted(); // Call it immediately on mount
    this.intervalId = setInterval(this.fetchUserSubmitted, 30000); // Then every 30 seconds
  },
  unmounted() {
    clearInterval(this.intervalId); // Clear the interval when the component is destroyed
  },

  data() {
    return {
      windowWidth: window.innerWidth,
      showModal:false,
      animation: 0,
      username: '',
      userSubmitted: false,
      intervalId: 0,

      // Note: leaderboard is expected to be sorted in desc amount of `staked``
      leaderboard: begin_leaderboard
    }
  },
  methods: {
    async fetchUserSubmitted() {
      try {
        const response = await this.$http.get(`${this.$baseURL}/api/nft-ranking-submitted`, {
          params: {
            discord_username: this.username // Add this line to include the parameter
          }
        });
        let if_submitted = response.data;
        this.userSubmitted = if_submitted['submitted'] == true
        console.log(`Set`, this.userSubmitted)
      } catch (error) {
        console.error('Failed to fetch nft submission:', error);
      }
    },
    async fetchNFTRankings() {
      try {
        const response = await this.$http.get(`${this.$baseURL}/api/nft-ranking`);
        let temp_rankings = response.data;
        console.log(temp_rankings);

        let new_leaderboard = updateLeaderboard(begin_leaderboard, temp_rankings)
        console.log("New leaderboard", new_leaderboard)

        let sorted_leaderboard = new_leaderboard.sort((a, b) => b.staked - a.staked);
        this.leaderboard = sorted_leaderboard;

      } catch (error) {
        console.error('Failed to fetch rankings:', error);
      }
    },
    barStyle(entry){
      const sizeForText = 200;
      const width = lerp(entry.staked, 0, this.maxStaked, 0, this.chartWidth-sizeForText);

      // Make sure everyone has a bar
      const adjustedWidth = Math.max(2, width);
      return {width: adjustedWidth + 'px'}
    },
    computePercentage(staked){
      const total = this.leaderboard.map(entry => entry.staked).reduce((accumulator, currentValue) => {
        return accumulator + currentValue;
      }, 0);
      console.log(total)
      return Math.round(staked*this.animation/total*100);
    },
    storeDataAndNavigate() {
      // // Example username to pass
      // const username = 'user123';

      // // Use localStorage or sessionStorage to store the username
      // localStorage.setItem('username', username);
      // // OR sessionStorage.setItem('username', username);

      // // Open the React app in a new tab
      // window.open('http://localhost:5173', '_blank');

      let WALLET_CONNECT_URL = this.$walletURL;

      // Assuming you're opening a new window to another domain
      var targetWindow = window.open(WALLET_CONNECT_URL, '_blank');

      console.log(`Moving user to`, WALLET_CONNECT_URL, ` for username`, this.username)

      // Data to send
      var userData = {
        url: WALLET_CONNECT_URL,
        username: this.username
      };

      setTimeout(() => {
        targetWindow.postMessage(userData, WALLET_CONNECT_URL);
      }, 500); // Adjust the timeout as necessary
      setTimeout(() => {
        targetWindow.postMessage(userData, WALLET_CONNECT_URL);
      }, 1000); // Adjust the timeout as necessary
      setTimeout(() => {
        targetWindow.postMessage(userData, WALLET_CONNECT_URL);
      }, 2000); // Adjust the timeout as necessary
      setTimeout(() => {
        targetWindow.postMessage(userData, WALLET_CONNECT_URL);
      }, 10000); // Adjust the timeout as necessary

    },

    registerNewUser() {
      // Step 1: Redirect to Discord OAuth URL if 'code' is not present in URL
      const oauthState = this.generateRandomString();
      localStorage.setItem('oauth-state', oauthState);

      const baseUrl = `${window.location.protocol}//${window.location.host}/puzzle6`;

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

      let url_code = this.$callbackURLDict[cur_url];

      fetch(`${this.$baseURL}/api/auth/discord/callback?code=${encodeURIComponent(code)}&puz=6&url=${url_code}`)
        .then(response => response.json())
        .then(data => {
          console.log("Got data from callbacK")
          console.log(data)
          // Assuming the server responds with the user's Discord username and discriminator
          if (data.username) {
            this.username = data.username
            console.log("setting user data to")
            console.log(this.username);
            this.fetchUserSubmitted();
          } else {
            console.log("Invalid discord code")
          }
        })
        .catch(error => console.error('Error fetching user info:', error));
    }
  },

};
</script>