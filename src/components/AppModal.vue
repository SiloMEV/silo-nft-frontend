 <template>
  <div v-if="showModal" class="modal">
    <div class="modal-content">
      <span v-if="closeable" class="close" @click="showModal=false">&times;</span>

      <div v-if="!(autofillPassword || puzzleSolved)">
        <p style="font-size: 2em; font-weight: bold;">{{title}}</p>
        <br>
        <slot></slot>
        <form v-if="showForm" @submit.prevent="submitPassword" style="margin-top: 16px">
          <input type="password" v-model="password" placeholder="Enter password">
          <button type="submit" class="modal-submit-btn">{{submitButtonText}}</button>
        </form>
      </div>
      <div v-else>
        <p style="font-size: 2em; font-weight: bold;">Congratulations!</p>
        <br>
         <slot name="slot2">
           <p class="smaller-text">You have solved the puzzle! You are a true farmor!</p>
        </slot>
        <div>
          <p class="smaller-text">P.S. Thank you for playing, this has been the largest NFT drop event in Sei history - thank you to every single one of you for helping out, participating, and having fun! We hope you enjoyed it! E> </p>
          <img src="../assets/cat.gif">
        </div>
<!--        UNCOMMENT THIS TO ALLOW SUBMISSION
         <form @submit.prevent="submitUsername">
          <input type="text" v-model="username" placeholder="Enter username">
          <button type="submit" class="modal-submit-btn">Submit</button>


        </form>

        <div class="content__buttons">
          <button v-if="!username" @click="registerNewUser" class="content__button content__button--register">
              Connect Discord
          </button>
          <button v-else :disabled="true" class="content__button content__button--register">
          </button>
        </div> -->

      </div>
    </div>
  </div>
</template>


<script>

const PUZZLE_KEYS = {
  1: "zjxljozdfias0e9a-w0e",
  2: "izpxocvopizxiopoipzsdfi0",
  3: "09z8w39as90ef0dfoi23i4oljaldf",
  4: "osapwoezxdklfjzdsfripaower234",
  5: "zxjifw90era90werszdiofipozspower",
  6: "zxiodaopawe0riwapeorwpowaeear",
  7: "piozsipozxodpifiopzdfrzew90w34"
};

export default {
  name: "AppModal",
  props: {
    puzzleNumber: {
      type: Number,
      required: true
    },
    title: {
      default: "Congratulations!"
    },
    closeable: {
      type: Boolean,
      default: true
    },
    showForm:{
      type: Boolean,
      default: true
    },
    // If you don't want the user to enter a password, you can autofill it
    autofillPassword: {
      type: String,
      default: ''
    }
  },
  data(){
     return {
      showModal: true,
      password: '',
      puzzleSolved: false,
      username: '',
      submitButtonText: 'Submit'
    };
  },
  mounted(){
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    const code = urlParams.get('code');

    if (code) {
      this.handleAuthentication(code);
    }
    let stored_pass = localStorage.getItem(`puzzle-${this.puzzleNumber}-password`);
    if (stored_pass) {
        // Handle as solved
      this.password = stored_pass;
      this.puzzleSolved = true;
    }
  },
  methods: {
    async submitPassword() {
      console.log("Password submitted:", this.password);
      this.submitButtonText = 'Trying...'
      try {
        let response = await this.$http.post(`${this.$baseURL}/api/answer`, {
          puzzleNumber: this.puzzleNumber,
          puzzleKey: PUZZLE_KEYS[this.puzzleNumber],
          puzzleAnswer: this.password
        });
        this.submitButtonText = "Submit";
        // Handle success (show a message or redirect)
        console.log('Success:', response);
        console.log(response);
        if (response['data']['response'] == 'success') {
          //Okay this should now come up with modifying our dialouge box.
          // username to submit
          this.puzzleSolved = true;
          localStorage.setItem(`puzzle-${this.puzzleNumber}-password`, this.password);
        } else {
          console.log("nope")
          alert("Incorrect password, try again.")
        }

      } catch (error) {
        // Handle error (show an error message)
        console.error('Error:', error);
        alert('Failed to submit the answer. Please try again.');
      }
       


      // Add your logic to handle the password submission
      // For example, sending it to a server
      // this.showModal = false; // close modal after submit
    },
    async submitUsername() {
      console.log("Submitting username & password now!");
      console.log(this.username);
      try {
        let response = await this.$http.post(`${this.$baseURL}/api/submission`, {
          puzzleNumber: this.puzzleNumber,
          puzzleKey: PUZZLE_KEYS[this.puzzleNumber],
          puzzleAnswer: this.password || this.autofillPassword,
          username: this.username
        });
        console.log("Success", response);
        let place = response['data']['entriesForPuzzle'];

        alert(`Congratulations! You are the ${place}th person to finish this puzzle!`)
        this.puzzleSolved = false;
        localStorage.setItem(`puzzle-${this.puzzleNumber}-password`, '');
      } catch (error) {
        console.log("Error", error)
        let error_msg = error['response']['data']
        console.log(`Error:`)
        alert(error_msg);
      }


    },
    registerNewUser() {
      // Step 1: Redirect to Discord OAuth URL if 'code' is not present in URL
      const oauthState = this.generateRandomString();
      localStorage.setItem('oauth-state', oauthState);

      const baseUrl = `${window.location.protocol}//${window.location.host}/puzzle${this.puzzleNumber}`;

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

      fetch(`${this.$baseURL}/api/auth/discord/callback?code=${encodeURIComponent(code)}&puz=${this.puzzleNumber}&url=${url_code}`)
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
    }

  },
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgb(0,0,0);
  background-image: radial-gradient(110.94% 110.94% at 50% 7.03%, rgba(74, 224, 123, 0.04) 0%, rgba(40, 232, 117, 0) 100%), linear-gradient(180deg, #FFFFFF -31.4%, #EEFFF9 -31.39%, #F7F7F8 39.5%);
  padding-bottom: 20px; /* Equivalent to 'pb-20' in Tailwind CSS */
}

.modal-content {
  background-color: #fefefe;
  margin: 10% auto; /* Adjust margins for a taller appearance */
  padding: 20px;
  border: 4px solid #eee;
  width: 40%; /* Further reduce width for a less wide appearance */
  min-width: 400px;
}

.modal-submit-btn {
  border: 4px solid #433;
  padding: 5px 10px; /* Smaller size, adjust as needed */
  margin-top: 15px; /* Larger gap between input and button */
  cursor: pointer;
}

/* Ensure input fields are properly aligned and sized */
form input[type="password"], form input[type="text"] {
  width: calc(100% - 20px); /* Adjust width as per design needs */
  padding: 5px;
  margin-bottom: 10px; /* Adjust gap between fields */
}


/* Increase gap by adding margin to the input */
input[type="text"],
input[type="password"] {
  margin-bottom: 20px; /* Adjust the value as needed for the desired gap */
  border: 4px solid #333;
}


.close {
  color: #333;
  float: right;
  font-size: 20px;
  font-weight: 100;
  position: relative;
  top: -8px;
/*  border: 4px solid #333;*/
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}


/* Media query for devices with width less than or equal to 768px */
@media (max-width: 768px) {
.modal-content {
  margin: 20% auto; 
  width: 80%; 
}

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

</style>