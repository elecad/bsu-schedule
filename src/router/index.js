import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import Shedule from "@/views/group/GroupMainView.vue";
import TeacherMain from "@/views/teacher/TeacherMainView.vue";
import LocationMain from "@/views/location/LocationMainView.vue";
import NotFound from "@/views/NotFound.vue";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "main",
    component: WelcomeView,
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
    path: "/l/:id",
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
