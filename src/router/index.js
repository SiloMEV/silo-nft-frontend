import { createRouter, createWebHistory } from 'vue-router'

//import AppHome from "../views/AppHome.vue"

import AppPuzzle1 from '../views/AppPuzzle1.vue'
import AppPuzzle2 from '../views/AppPuzzle2.vue'
import AppPuzzle3 from '../views/AppPuzzle3.vue'
import AppPuzzle4 from '../views/AppPuzzle4.vue'
import AppPuzzle5 from '../views/AppPuzzle5.vue'
import AppPuzzle6 from '../views/AppPuzzle6.vue'
import AppPuzzle7 from '../views/AppPuzzle7.vue'
import Fake4041 from '../views/Fake404-1.vue'
import Fake4042 from '../views/Fake404-2.vue'

import Svg1 from "@/views/Svg1.vue";
import Svg2 from "@/views/Svg2.vue";
import NotReady from "@/views/NotReady.vue";
import LeaderBoardPage from "@/views/LeaderBoardPage.vue";


const routes = [
  {
    path: '/',
    name: 'Home',
    // component: AppHome,
    component: LeaderBoardPage,
    meta: { isActive: true, isShown: true } // Assume home page is always active
  },
  {
    path: '/puzzle1',
    name: 'Puzzle 1',
    component: AppPuzzle1,
    meta: { isActive: true, isShown: true } // Update these based on your activation logic
  },
  // Repeat for other routes, setting `isActive` as needed
  {
    path: '/puzzle2',
    name: 'Puzzle 2',
    component: AppPuzzle2,
    meta: { isActive: true, isShown: true } // This page is not active yet
  },
  {
    path: '/puzzle3',
    name: 'Puzzle 3',
    component: AppPuzzle3,
    meta: { isActive: true, isShown: true  } // This page is not active yet
  },
  {
    path: '/puzzle4',
    name: 'Puzzle 4',
    component: AppPuzzle4,
    meta: { isActive: true, isShown: true  } // This page is not active yet
  },
  {
    path: '/puzzle5',
    name: 'Puzzle 5',
    component: AppPuzzle5,
    meta: { isActive: true, isShown: true  } // This page is not active yet
  },
  {
    path: '/puzzle6',
    name: 'Puzzle 6',
    component: AppPuzzle6,
    meta: { isActive: true, isShown: true } // This page is not active yet
  },
  {
    path: '/puzzle-the-last',
    name: 'Puzzle 7',
    component: AppPuzzle7,
    meta: { isActive: true, isShown: true } // This page is not active yet
  },
  {
    path: '/puzzle7',
    name: 'Fake4043',
    component: Fake4041,
    meta: { isActive: true, isShown: true, hideHeader: true } // This page is not active yet
  },
  {
    path: '/this-might-look-like-a-404',
    name: 'Fake4041',
    component: Fake4041,
    meta: { isActive: true, isShown: true, hideHeader: true } // This page is not active yet
  },
  {
    path: '/oh-look-another-404',
    name: 'Fake4042',
    component: Fake4042,
    meta: { isActive: true, isShown: true, hideHeader: true } // This page is not active yet
  },
  {
    path: '/thespecialblock1',
    component: Svg1,
    meta: { isActive: true, isShown: true } // This page is not active yet
  },
  {
    path: '/thespecialblock-two',
    component: Svg2,
    meta: { isActive: true, isShown: true } // This page is not active yet
  },
  {
    path: '/notready',
    component: NotReady,
    meta: { isActive: true, isShown: true } // This page is not active yet
  }
];


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to, from, next) => {
  // Check if the route is marked as active
  if (to.matched.some(record => record.meta.isActive)) {
    // Route is active, proceed as normal
    next();
  } else {
    // Route is not active, redirect to the home page or a custom page
    next({ path: '/notready' }); // Redirect to home, change as needed
  }
});

export default router
