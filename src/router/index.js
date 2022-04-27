import Vue from "vue";
import VueRouter from "vue-router";

import Shedule from "@/views/Schedule.vue";

import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    redirect: "/g/12001902",
  },
  {
    path: "/g/:id",
    name: "group",
    component: Shedule,
  },
  {
    path: "/t/:id",
    name: "teacher",
    component: Shedule,
  },
  {
    path: "/a/:id",
    name: "location",
    component: Shedule,
  },
  {
    path: "*",
    name: "404",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
