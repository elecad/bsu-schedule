<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import navBarMobile from "@/components/mobile/NavBar/TheNavbarMobile.vue";

export default {
  name: "App",

  components: { navBarMobile },
  data: () => ({}),
  created() {
    this.$store.commit("INIT");
    this.$vuetify.theme.dark = this.$store.getters.getTheme;
  },
};
</script>

<style lang="scss">
html {
  overflow-y: auto;
}

body::-webkit-scrollbar {
  width: 0 !important;
}
body {
  overflow: -moz-scrollbars-none;
  -ms-overflow-style: none;
}

.theme--light.v-application {
  background-color: var(--v-background-base, #edeef0) !important;
}

.v-navigation-drawer.theme--light {
  background-color: var(--v-background-base, #f5f5f5) !important;
}
</style>
