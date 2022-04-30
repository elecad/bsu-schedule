<template>
  <v-app>
    <router-view />
  </v-app>
</template>

<script>
import navBarMobile from "@/components/mobile/NavBar/TheNavbarMobile.vue";
import SystemUI from "./class/SystemUI";

export default {
  name: "App",

  components: { navBarMobile },
  data: () => ({}),
  computed: {
    settings() {
      return this.$store.getters.getSettings;
    },
  },
  created() {
    this.$store.commit("INIT");
    if (this.settings.dark) {
      this.$vuetify.theme.dark = this.settings ? true : false;
      SystemUI.changeThemeAppBar();
      document.body.classList.add("dark");
    } else {
      document.body.classList.add("light");
    }
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

.light::-webkit-scrollbar {
  width: 7px;

  background-color: #f9f9fd;
}

.light::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: gray;
}

.light::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #edeef0;
}

.dark::-webkit-scrollbar {
  width: 7px;
  background-color: #121212;
}

.dark::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #757575;
}

.dark::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #121212;
}

.theme--light.v-application {
  background-color: var(--v-background-base, #edeef0) !important;
}

.v-navigation-drawer.theme--light {
  background-color: var(--v-background-base, #f5f5f5) !important;
}

body.dark {
  --cupertino-pane-icon-close-color: #a8a7ae;
  --cupertino-pane-background: #1c1c1d;
  --cupertino-pane-color: #ffffff;
  --cupertino-pane-shadow: 0 4px 16px rgb(0 0 0 / 12%);
  --cupertino-pane-border-radius: 20px;
  --cupertino-pane-move-background: #424246;
  --cupertino-pane-destroy-button-background: #424246;
}
</style>
