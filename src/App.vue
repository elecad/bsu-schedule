<template>
  <v-app>
    <schedule-nav-bar></schedule-nav-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import scheduleNavBar from "@/components/NavBarMobile/TheNavbarMobile.vue";

export default {
  name: "App",

  components: { scheduleNavBar },
  data: () => ({}),
};
</script>

<style>
html {
  overflow-y: auto;
}
</style>
