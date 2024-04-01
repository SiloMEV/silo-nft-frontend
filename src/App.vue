<template>
  <div id="app" className="bg-gradient">
    <AppHeader v-if="showHeader"/>
    <RouterView />
  </div>
</template>

<script>
import AppHeader from "./components/AppHeader";
export default {
  name: "App",
  components: {
    AppHeader
  },
  computed: {
    showHeader(){
      const noShowRoutes = ['Fake4041', 'Fake4042', 'Fake4043'];
      return noShowRoutes.indexOf(this.$route.name) == -1;
    }
  }
};
</script>

<style>
* {
  box-sizing: border-box;
}
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
body {
  font-family: sans-serif;
}

.smaller-text {
  font-size: 1em; /* Smaller text size */
  margin-bottom: 15px; /* Adjust space as per design needs */
}

</style>