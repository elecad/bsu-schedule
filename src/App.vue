<template>
  <v-app :class="{ 'stop-scrolling': $store.getters.isSearch }">
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
  created() {
    this.$store.commit("INIT");
    this.$vuetify.theme.dark = this.$store.getters.getTheme;
  },
};
</script>

<style>
html {
  overflow-y: auto;
}
.stop-scrolling {
  height: 100vh !important;

  overflow: hidden;
}

body::-webkit-scrollbar {
  width: 0 !important;
}
body {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}
</style>
