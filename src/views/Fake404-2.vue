<template>
  <div>
    <div class="background-image">
      <div :class="{'error-message': true, 'hovered': isClicked}">
        <span class="highlight" @click="toggleClick">404</span>
      </div>
      <!-- Existing images here (if needed you can remove them or make part of images array) -->
      <img v-for="(image, index) in images" :key="index" :src="image.src" alt="Decorative Image" :class="image.class" :style="{ bottom: image.bottom + 'px', left: image.left + 'px' }">
      <span class="middle-text" @click="goToFinalPuzzle" v-if="finalPuzzle">Enter Final Puzzle</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "Fake4042",
  data() {
    return {
      userAnswer: '',
      isClicked: false, // Track click state
      images: [
        // Initial images can be added here if necessary
        { src: require("../assets/farmor2-min.png"), class: "bottom-left-image", bottom: 0, left: 0 }, // Example initial image
      ],
      count: 0,
      finalPuzzle: false,
    };
  },
  methods: {
    toggleClick() {
      this.isClicked = !this.isClicked; // Toggle the clicked state
      // Generate random position for the new image
      const bottomPos = Math.floor(Math.random() * 500); // Example, adjust based on your UI
      const leftPos = Math.floor(Math.random() * 500); // Example, adjust based on your UI
      // Add new image with random position
      this.images.push({
        src: require("../assets/farmor2-min.png"),
        class: "randomly-placed-image",
        bottom: bottomPos,
        left: leftPos,
      });
      this.count++;
      if (this.count > 10) {
        console.log("HI")
        this.finalPuzzle = true;
      }
    },
    goToFinalPuzzle() {
      // Alert the user
      // alert('Enter Final Puzzle');

      // Navigate to /last-puzzle
      this.$router.push('/puzzle-the-last');
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


.middle-text {
  font-size: 5em; /* Big size */
  color: #FFF; /* Default white color, will be overridden by animation */
  animation: flash 0.5s infinite alternate, colorChange 5s infinite alternate; /* Quicker flashing and color change */
  text-shadow:
    0 0 5px #fff, /* White glow */
    0 0 10px #fff, /* White glow */
    0 0 20px #0fa, /* Primary neon color */
    0 0 40px #0fa, /* Primary neon color */
    0 0 80px #0fa, /* Primary neon color */
    0 0 90px #0fa; /* Primary neon color */
  cursor: pointer;
}

/* Flashing effect */
@keyframes flash {
  from {
    opacity: 1;
  }
  to {
    opacity: 0.5;
  }
}

/* Color change effect */
@keyframes colorChange {
  0% { color: #f0f; text-shadow: 0 0 5px #f0f, 0 0 10px #f0f, 0 0 20px #f0f, 0 0 40px #f0f, 0 0 80px #f0f, 0 0 90px #f0f; }
  25% { color: #0ff; text-shadow: 0 0 5px #0ff, 0 0 10px #0ff, 0 0 20px #0ff, 0 0 40px #0ff, 0 0 80px #0ff, 0 0 90px #0ff; }
  50% { color: #0f0; text-shadow: 0 0 5px #0f0, 0 0 10px #0f0, 0 0 20px #0f0, 0 0 40px #0f0, 0 0 80px #0f0, 0 0 90px #0f0; }
  75% { color: #ff0; text-shadow: 0 0 5px #ff0, 0 0 10px #ff0, 0 0 20px #ff0, 0 0 40px #ff0, 0 0 80px #ff0, 0 0 90px #ff0; }
  100% { color: #f00; text-shadow: 0 0 5px #f00, 0 0 10px #f00, 0 0 20px #f00, 0 0 40px #f00, 0 0 80px #f00, 0 0 90px #f00; }
}

</style>