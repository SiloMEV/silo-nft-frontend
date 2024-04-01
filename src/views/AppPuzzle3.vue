<template>
  <app-modal :puzzle-number="3" title="What is your answer?" :closeable="false">
    <p>
      Today, Farmer Bob was digging in the field on the Silo Protocol farm when, he suddenly mined something shocking! He did this at Mar 23, 2024, 3:59:43 PM (UTC). He remembers that he had seen a few of these before..... Something wasn't quite the same about it though...
    </p>
    <br>
    <p>
      Just going to leave this right here: <a href="https://www.svgviewer.dev/svg-to-png" style="color: limegreen;">Super Valuable Gold to Pretty Nonfungible Goodies</a>
    </p>

 </app-modal>

</template>

<script>
  import AppModal from "../components/AppModal";

export default {
  name: "AppPuzzle3",
  components: {
    AppModal
  },
  data() {
    return {
      userAnswer: '',
    };
  },
  methods: {
    async submitAnswer() {
      try {
        const response = await this.$http.post(`${this.$baseURL}/api/answer`, {
          answer: this.userAnswer
        });
        // Handle success (show a message or redirect)
        console.log('Success:', response);
        console.log(response);
        alert('Answer submitted successfully!');
      } catch (error) {
        // Handle error (show an error message)
        console.error('Error:', error);
        alert('Failed to submit the answer. Please try again.');
      }
    }
  }
};
</script>

<style scoped>
.content {
  padding: 7rem 2rem;
}
.content__heading {
  text-align: center;
  margin-bottom: 1rem;
}
.content__separator {
  border-color: gray;
  margin-bottom: 1rem;
}
</style>