// import Router from "vue-router";

// const createRouter = () => {
//   const router = new Router({
//     routes: [
//       {
//         path: "/",
//         name: "home",
//         component: () =>
//           import(/* webpackChunkName: "home" */ "./components/Menu.vue")
//       },

//       {
//         path: "/weather/:city",
//         name: "weather",
//         component: () =>
//           import(
//             /* webpackChunkName: "weatherDetails" */ "./components/Weather.vue"
//           ),
//       },
//     ]
//   });
//   return router;
// }

// export default createRouter;

import VueRouter from "vue-router";
import Vue from "vue";

let home = require("./components/Menu.vue");
let weather = require("./components/Weather.vue");

const routes = [
  {
    path: "/",
    component: home,
  },
  {
    path: "/weather/:city",
    component: weather,
  },
];

const router = new VueRouter({
  mode: "history",
  routes,
});

Vue.use(VueRouter);

export default router;

window.app = new Vue({
  el: "#app",
  router,
  render: (h) => h(home),
});
