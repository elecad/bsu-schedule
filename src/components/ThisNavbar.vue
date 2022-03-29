<template>
  <nav class="navbar-mobile elevation-5">
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
        ref="test"
        dense
        filled
        solo
        :items="search"
        hide-details="false"
        placeholder="Поиск..."
        prepend-inner-icon="mdi-magnify"
        height="50px"
      ></v-autocomplete>
    </v-app-bar>
    <v-overlay :value="openSearchMobile" opacity="0.2"></v-overlay>

    <v-dialog v-model="openSetting" scrollable>
      <v-card>
        <v-card-title class="text-h5"> Настройки </v-card-title>

        <v-card-text>
          Здесь будут находится будущие настройки приложения...
          <h4>Пока тут...</h4>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
          <h2>Привет, Серёжа!!!</h2>
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
export default {
  name: "NavBar",
  data: () => ({
    openSearchMobile: false,
    openSetting: false,
    search: [
      {
        text: "12001902",
        value: "12001902",
      },
    ],
  }),
  methods: {
    searchOpenMobile() {
      this.openSearchMobile = true;
      this.$refs.test.$refs.input.focus();
    },
    searchCloseMobile() {
      this.openSearchMobile = false;
    },
    settingsOpenMobile() {
      this.openSetting = true;
    },
    settingsCloseMobile() {
      this.openSetting = false;
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
