<template>
  <nav class="navbar-mobile">
    <main-nav-bar @open--settings="settingsOpenMobile"></main-nav-bar>

    <app-settings
      :openSetting="openSetting"
      @close--settings="settingsCloseMobile"
    ></app-settings>
  </nav>
</template>

<script>
import Parsers from "@/parser/parsers.js";
import mainNavBar from "@/components/NavBarMobile/mainNavBarMobile.vue";
import appSettings from "@/components/Settings/AppSettings.vue";
import AppSettings from "@/components/Settings/AppSettings.vue";

export default {
  name: "navBar",
  components: { mainNavBar, AppSettings },
  data: () => ({
    openSetting: false,
  }),
  methods: {
    searchOpenMobile() {
      this.openSearchMobile = true;
    },
    searchCloseMobile() {
      this.openSearchMobile = false;
      this.search = [];
    },
    settingsOpenMobile() {
      this.openSetting = true;
    },
    settingsCloseMobile() {
      this.openSetting = false;
    },

    async searchMobile(value) {},

    goSchedule(value) {
      console.log(value);
      alert(`Переход: ${value.label}(id ${value.id}) на ${value.type}`);
      this.searchCloseMobile();
    },
  },
};
</script>

<style>
.navbar-mobile--search {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
}

.navbar-mobile--search.search-mobile-active {
  top: 0;
  left: 0;
  z-index: 6;
}
</style>
