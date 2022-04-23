import Vue from "vue";
import Router from "vue-router";

import AppHome from "@/views/AppHome";
import AppAbout from "@/views/AppAbout";
import AppError from "@/views/AppError";

Vue.use(Router);

export default new Router({
  mode: "history",

  routes: [
    {
      path: "/",
      name: "app-home",
      component: AppHome,
    },
    {
      path: "/about",
      name: "app-about",
      component: AppAbout,
    },
    {
      path: "*",
      name: "app-error",
      component: AppError,
    },
  ],
});
