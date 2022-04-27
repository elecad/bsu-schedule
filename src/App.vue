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
    // const last = this.$store.getters.getLast;
    // this.$router.push({ name: last.type, params: { id: last.id } });
  },
};
</script>

<style lang="scss">
@media (max-width: 959px) {
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
}

body::-webkit-scrollbar {
  width: 9px;

  background-color: #f9f9fd;
}

body::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: gray;
}

body::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #edeef0;
}

.theme--light.v-application {
  background-color: var(--v-background-base, #edeef0) !important;
}

.v-navigation-drawer.theme--light {
  background-color: var(--v-background-base, #f5f5f5) !important;
}
</style>
