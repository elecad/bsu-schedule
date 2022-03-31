<template>
  <nav class="navbar-mobile">
    <v-app-bar class="navbar-mobile__main" height="60px">
      <v-icon class="mr-1">mdi-school-outline</v-icon>
      <v-toolbar-title>Расписание</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-btn icon @click="searchOpenMobile">
        <v-icon>mdi-magnify</v-icon>
      </v-btn>
      <v-btn icon @click="settingsOpenMobile">
        <v-icon>mdi-cog</v-icon>
      </v-btn>
    </v-app-bar>

    <v-app-bar
      class="navbar-mobile__search"
      height="75px"
      rounded
      :class="{
        'search-mobile-active': openSearchMobile,
        'elevation-4': openSearchMobile,
      }"
    >
      <v-btn icon class="mr-1" @click="searchCloseMobile">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-autocomplete
        @update:search-input="searchMobile"
        @change="goSchedule"
        ref="test"
        allow-overflow
        counter="1"
        dense
        hide-no-data
        filled
        autofocus
        solo
        no-data-text="Ничего не найдено :("
        :items="search"
        hide-details="false"
        placeholder="Поиск..."
        prepend-inner-icon="mdi-magnify"
        height="50px"
      ></v-autocomplete>
    </v-app-bar>

    <v-overlay
      :value="openSearchMobile"
      opacity="0.2"
      @click="searchCloseMobile"
    ></v-overlay>

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

let controller = new AbortController();

export default {
  name: "NavBar",
  data: () => ({
    openSearchMobile: false,
    openSetting: false,
    search: [],
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
    async searchMobile(value) {
      controller.abort();
      controller = new AbortController();
      this.search = [];
      if (value) {
        const Fetch = new Parsers();

        const search = await Fetch.fetchSearch({
          query: value,
          signal: controller.signal,
        });
        console.log(search);

        for (let i = 0; i < search.length && i < 10; i++) {
          const el = search[i];
          const obj = {};
          // console.log(el);
          switch (el.type) {
            case "group":
              obj.text = el.content.id;
              obj.value = i;
              obj.type = "group";
              break;
            case "teacher":
              obj.text = `${el.content.Surname} ${el.content.Name} ${el.content.Middlename}`;
              obj.value = i;
              break;
            case "location":
              obj.text = `${el.content.aud} ${el.content.corp}`;
              obj.value = i;
              break;
            default:
              continue;
          }
          this.search.push(obj);
        }
      }
    },

    goSchedule(value) {
      console.log(value);
      console.log(this.search[value].type);
    },
  },
};
</script>

<style scoped>
.navbar-mobile__search {
  position: absolute;
  top: -100px;
  left: 0;
  width: 100%;
  height: 100%;
  transition: 0.3s;
}

.navbar-mobile__search.search-mobile-active {
  top: 0;
  left: 0;
  z-index: 6;
}
</style>
