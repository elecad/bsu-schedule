<template>
  <nav class="navbar-mobile">
    <v-container>
      <v-app-bar class="navbar-mobile__main">
        <v-icon class="mr-1">mdi-school-outline</v-icon>
        <v-toolbar-title>Расписание</v-toolbar-title>

        <v-spacer></v-spacer>

        <v-btn icon @click="searchOpenMobile">
          <v-icon>mdi-magnify</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-cog</v-icon>
        </v-btn>
      </v-app-bar>

      <v-app-bar
        height="75px"
        class="navbar-mobile__search"
        :class="{
          'search-mobile-active': openSearchMobile,
          'elevation-4': openSearchMobile,
        }"
      >
        <v-btn icon class="mr-1" @click="searchCloseMobile">
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>

        <v-autocomplete
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
      <div
        class="dark-search-mode"
        :class="{
          'search-mobile-active': openSearchMobile,
          'overflow-hidden': openSearchMobile,
        }"
      ></div>
    </v-container>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data: () => ({
    openSearchMobile: false,
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
    },
    searchCloseMobile() {
      this.openSearchMobile = false;
    },
  },
};
</script>

<style scoped>
.navbar-mobile {
  position: relative;
}

.navbar-mobile__search {
  position: absolute;
  top: -160%;
  left: 0;
  transition: 0.3s;
}

.navbar-mobile__search.search-mobile-active {
  top: 0;
  left: 0;
  z-index: 10;
}

.dark-search-mode {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vh;
  height: 100vh;
  background-color: black;
  opacity: 0;
  visibility: hidden;
  transition: 0.3s;
}

.dark-search-mode.search-mobile-active {
  visibility: visible;
  opacity: 0.4;
}
</style>
