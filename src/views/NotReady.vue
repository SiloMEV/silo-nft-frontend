<template>
  <app-modal :puzzle-number="50000" title="This puzzle is not yet ready" :closeable="false" :show-form="false" >

    <img src="@/assets/farmor2-min.png">
    <p>
    Come back tomorrow.
    </p>
    <p>
    Why don't you <a href="https://app.silostaking.io/">stake some SEI</a> while you are waiting?
    </p>

 </app-modal>

</template>

<script>
  import AppModal from "../components/AppModal";

export default {
  name: "NotReady",
  components: {
    AppModal
  },
};
</script>

<style scoped>

p{
  margin: 16px 0;
}

a{
  text-decoration: underline;
}
</style>