<template>
  <div>
    <div class="background-image">
      <div :class="{'error-message': true, 'hovered': isClicked}">
        <span class="transparent-text">sei1j9u4grm3rrj2j</span>
        <span class="highlight" @click="toggleClick">404</span>
        <span class="transparent-text">0f87ku7wtl6n6agkajrk0w</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fake4041",
  data() {
    return {
      userAnswer: '',
      isClicked: false, // Track click state
    };
  },
  methods: {
    toggleClick() {
      this.isClicked = !this.isClicked; // Toggle the clicked state
    }
  },
  mounted() {
    this.$showHeader = false;
  },
  beforeUnmount() {
    this.$showHeader = true;
  }
};
</script>

<style scoped>
/* Add your existing styles here */

.randomly-placed-image {
  position: absolute;
  max-width: 100px; /* Adjust as needed */
  max-height: 100px; /* Adjust as needed */
}

.background-image {
  background-image: url('../assets/background_404-min.png');
  background-size: cover;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  min-height: 100%;
  min-width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.bottom-left-image {
  position: absolute;
  bottom: 0;
  left: 0;
  /* Adjust the size as needed */
  max-width: 100px; /* Example size, adjust if needed */
  max-height: 100px; /* Example size, adjust if needed */
}

.bottom-left-image-right {
  position: absolute;
  bottom: 0;
  left: 100px; /* Offset by the width of the first image */
  /* Adjust the size as needed to match the first image */
  max-width: 100px; /* Example size, adjust if needed */
  max-height: 100px; /* Example size, adjust if needed */
}

.error-message {
  width: 300px;
  position: absolute;
  right: 100px;
  bottom: 330px; /* Adjusted to make it higher */
  font-size: 1.5em;
  z-index: 10;
  cursor: default;
}

.hovered .transparent-text {
  color: rgba(255, 255, 255, 1); /* Make text white on click */
}

.transparent-text {
  transition: color 0.3s; /* Smooth transition for color change */
  color: rgba(255, 255, 255, 0); /* Initially transparent */
  font-size: 0.5em;
}

.highlight {
  color: #FFF;
  font-size: 2em; /* Make 404 larger */
}

a {
  cursor: none;
}
</style>