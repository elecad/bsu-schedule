<template>
  <nav class="navbar-mobile">
    <main-nav-bar
      @open--settings="settingsOpenMobile"
      @open--favorite="favoriteOpenMobile"
    ></main-nav-bar>

    <app-settings
      :openSetting="openSetting"
      @close--settings="settingsCloseMobile"
    ></app-settings>

    <v-bottom-sheet v-model="openFavorite">
      <favorite-mobile></favorite-mobile>
    </v-bottom-sheet>
  </nav>
</template>

<script>
import mainNavBar from "@/components/mobile/NavBar/mainNavBarMobile.vue";
import appSettings from "@/components/Settings/AppSettings.vue";
import favoriteMobile from "@/components/mobile/Favorite/TheFavorite.vue";

export default {
  name: "navBar",
  components: { mainNavBar, appSettings, favoriteMobile },
  data: () => ({
    openSetting: false,
    openFavorite: false,
  }),
  methods: {
    searchOpenMobile() {
      this.openSearchMobile = true;
    },
    favoriteOpenMobile() {
      this.openFavorite = true;
      // this.$refs["favorite-mobile"].showCupertino();
    },
    favoriteCloseMobile() {
      this.openFavorite = false;
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
