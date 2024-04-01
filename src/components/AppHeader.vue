<template>
  <header class="header">
    <button @click="toggleNav" class="hamburger" :class="{'is-active': navOpen}">
      ☰
    </button>
    <nav class="header__nav" :class="{'is-open': navOpen}">
      <RouterLink class="header__nav__link" to="/">
        Home
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle1" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 1')}">
        1-Swirl
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle2" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 2')}">
        2-Digging
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle3" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 3')}">
        3-Block
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle4" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 4')}">
        4-Silence
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle5" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 5')}">
        5-History
      </RouterLink>
      <RouterLink class="header__nav__link" to="/puzzle6" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 6')}">
        6-Staking
      </RouterLink>
      <RouterLink class="header__nav__link" to="/this-might-look-like-a-404" :class="{'header__nav__link--inactive': !isRouteActive('Puzzle 7')}">
        7-Reflections
      </RouterLink>
    </nav>
  </header>
</template>


<script>
export default {
  name: "AppHeader",
  data() {
    return {
      navOpen: false, // Navigation menu state
    };
  },
  methods: {
    toggleNav() {
      this.navOpen = !this.navOpen;
    },
    isRouteActive(routeName) {
      const route = this.$router.options.routes.find(r => r.name === routeName);
      return route && route.meta.isShown;
    }
  },


};
</script>

<style scoped>
.header {
  text-align: center;
  padding: 1rem 0;
  position: fixed;
  width: 100%;
  z-index: 2;
  background-color: rgba(0, 0, 0, 0.9);
  min-height: 56px; /* Adjust this value as needed */
}
.header__title {
  color: goldenrod;
}
.header__nav {
  display: flex;
  justify-content: space-evenly;
}
.header__nav__link {
  text-decoration: none;
  color: #fff;
}

.header__nav__link:hover {
  color: limegreen;
}
/* Hamburger button styles */
.hamburger {
  display: none;
  background-color: transparent;
  border: none;
  color: white;
  font-size: 2rem;
  cursor: pointer;
  position: absolute;
  top: 0px; /* Adjust position to ensure visibility */
  right: 15px; /* Adjust position to ensure accessibility */
  z-index: 20; /* Ensure it's above other elements */
}

/* Responsive adjustments */
@media (max-width: 768px) {
  .hamburger {
    display: block; /* Show hamburger on smaller screens */
  }
  
  .header__nav {
    display: none; /* Hide nav by default on smaller screens */
    flex-direction: column;
    width: 100%;
    position: absolute;
    top: 100%;
    left: 0;
    background-color: rgba(0, 0, 0, 0.9);
    padding-top: 1rem; /* Add some space at the top if needed */
  }
  
  .header__nav.is-open {
    display: flex; /* Show nav when is-open class is added */
  }

  .header__nav__link {
    margin: 0.5rem 0; /* Adjust link spacing */
  }
}

/* Add is-active styles for the hamburger if needed */
.is-active {
  /* Styles when the menu is active */
}

.header__nav__link--inactive {
  color: #666; /* Darker grey */
  pointer-events: none; /* Disable clicking on the link */
}

</style>