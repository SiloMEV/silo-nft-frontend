import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import axios from 'axios';
import './assets/tailwind.css'

import { library } from "@fortawesome/fontawesome-svg-core";
import { faClipboard } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/vue-fontawesome";

const app = createApp(App);

library.add(faClipboard);

app.config.globalProperties.$http = axios;
app.config.globalProperties.$baseURL = process.env.VUE_APP_BASE_URL
app.config.globalProperties.$walletURL = process.env.VUE_APP_WALLET_URL
app.config.globalProperties.$discordClientId = process.env.VUE_APP_DISCORD_CLIENT_ID

app.config.globalProperties.$callbackURLDict = {
  'http://localhost:8080': 'ice',
  [process.env.VUE_APP_HOT_URL]: 'hot',
  [process.env.VUE_APP_ROOM_URL]: 'room'
}

app.component("font-awesome-icon", FontAwesomeIcon).use(store).use(router).mount('#app')

