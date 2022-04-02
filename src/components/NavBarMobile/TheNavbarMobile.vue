<template>
  <nav class="navbar-mobile">
    <main-nav-bar
      @search-open-mobile="searchOpenMobile"
      @search-close-mobile="searchCloseMobile"
    ></main-nav-bar>

    <v-dialog v-model="openSetting" scrollable>
      <v-card>
        <v-card-title class="text-h5"> Настройки </v-card-title>

        <v-card-text>
          Здесь будут находится будущие настройки приложения...
          <h4>Пока тут пусто...</h4>
        </v-card-text>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" text @click="settingsCloseMobile">
            Закрыть
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </nav>
</template>

<script>
import Parsers from "@/parser/parsers.js";
import mainNavBar from "@/components/NavBarMobile/mainNavBarMobile.vue";
import searchNavBar from "@/components/NavBarMobile/searchNavBarMobile.vue";

export default {
  name: "navBar",
  components: { mainNavBar, searchNavBar },
  data: () => ({
    openSearchMobile: false,
    openSetting: false,
    search: [],
    controller: new AbortController(),
    timeout: null,
    debounce: 400,
    noDataText: "Для поиска нужно более 2 символов",
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
