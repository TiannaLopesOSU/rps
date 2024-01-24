import { createRouter, createWebHashHistory } from "vue-router";
const routes = [
  //   {
  //     path: "/", // routes should be lowercase
  //     name: "Search",
  //     component: SearchView,
  //     beforeEnter: store.getters.shouldDoAuth ? authUser : null,
  //   },
];
const router = createRouter({
  mode: "history",
  linkExactActiveClass: "fw-bold",
  history: createWebHashHistory(process.env.BASE_URL),
  routes,
});

export default router;
