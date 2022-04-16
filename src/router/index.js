import Vue from "vue";
import VueRouter from "vue-router";
import WelcomeView from "../views/WelcomeView.vue";
import GroupMain from "@/views/group/GroupMainView.vue";
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
    path: "/group/:id",
    name: "group",
    component: GroupMain,
  },
  {
    path: "/teacher/:id",
    name: "teacher",
    component: TeacherMain,
  },
  {
    path: "/location/:id",
    name: "location",
    component: LocationMain,
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
