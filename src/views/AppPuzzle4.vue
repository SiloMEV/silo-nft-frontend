<template>
  <app-modal :puzzle-number="4" title="What do you hear?" :closeable="false">

  <a href="https://twitter.com/Silo_Stake" style="color: limegreen">👂👂👂👂👂👂👂👂👂👂👂👂👂</a>
 </app-modal>

</template>

<script>
  import AppModal from "../components/AppModal";

export default {
  name: "AppPuzzle4",
  components: {
    AppModal
  },
  data() {
    return {
      userAnswer: '',
    };
  }
};
</script>

<style scoped>
a{
  cursor: none;
}
</style>