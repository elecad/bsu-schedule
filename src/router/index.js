import Vue from "vue";
import VueRouter from "vue-router";

import Shedule from "@/views/Schedule.vue";
import NotFound from "@/views/NotFound.vue";
import Last from "@/views/LastRedirect.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: Last,
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
    path: "/404",
    name: "notFound",
    component: NotFound,
  },
  {
    path: "*",
    name: "notFoundv2",
    component: NotFound,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
