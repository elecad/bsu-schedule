import Vue from "vue";
import VueRouter from "vue-router";

import Schedule from "@/views/Schedule.vue";
import NotFound from "@/views/NotFound.vue";
import Last from "@/views/LastRedirect.vue";
import About from "@/components/general/AboutPage.vue";
import ClearPage from "@/views/ClearPage.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    redirect: "/init"
  },
  {
    path: "/init",
    name: "main",
    component: Last,
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Schedule,
  },
  {
    path: "/g/:id(\\d{6,})",
    name: "group",
    component: Schedule,
  },
  {
    path: "/t/:id(\\d+)",
    name: "teacher",
    component: Schedule,
  },
  {
    path: "/a/:id(\\d+)",
    name: "location",
    component: Schedule,
  },
  {
    path: "/about",
    name: "about",
    component: About,
  },
  {
    path: "/clear",
    name: "clear",
    component: ClearPage,
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
