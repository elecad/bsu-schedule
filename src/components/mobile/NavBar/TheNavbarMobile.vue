<template>
  <nav class="navbar-mobile">
    <main-nav-bar
      @open--settings="settingsOpenMobile"
      @open--favorite="favoriteOpenMobile"
    ></main-nav-bar>

    <app-settings v-model="openSettings"></app-settings>

    <bottom-sheet id="favorite--bottom--sheet" v-model="openFavorite">
      <favorite-mobile
        @close--bottom--sheet="openFavorite = false"
        :isOpen="openFavorite"
      ></favorite-mobile>
    </bottom-sheet>
  </nav>
</template>

<script>
import mainNavBar from "@/components/mobile/NavBar/mainNavBarMobile.vue";
import appSettings from "@/components/general/AppSettings.vue";
import favoriteMobile from "@/components/mobile/Favorite/TheFavorite.vue";
import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";
import SystemUI from "@/class/SystemUI";

export default {
  name: "navBar",
  components: { mainNavBar, appSettings, favoriteMobile, bottomSheet },
  data: () => ({
    openSettings: false,
    openFavorite: false,
  }),
  watch: {
    openSettings(newVal) {
      if (this.$store.getters.getSettings.dark) return;
      if (newVal) {
        SystemUI.overlayOnTheme(200);
      } else {
        SystemUI.overlayOffTheme(200);
      }
    },
  },
  methods: {
    favoriteOpenMobile() {
      this.openFavorite = true;
    },
    favoriteCloseMobile() {
      this.openFavorite = false;
    },
    searchCloseMobile() {
      this.openSearchMobile = false;
      this.search = [];
    },
    settingsOpenMobile() {
      this.openSettings = true;
    },
    settingsCloseMobile() {
      this.openSettings = false;
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
