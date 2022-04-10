<template>
  <v-app-bar class="navbar-mobile--main" height="60px">
    <div class="mr-2" style="positon: relative; width: 24px; height: 24px">
      <v-fade-transition leave-absolute>
        <v-icon v-if="!isSearch" style="position: absolute">
          mdi-school-outline
        </v-icon>
      </v-fade-transition>

      <v-fade-transition leave-absolute>
        <v-icon
          v-if="isSearch"
          style="position: absolute"
          @click="$store.commit('CHANGE_SEARCH')"
        >
          mdi-arrow-left
        </v-icon>
      </v-fade-transition>
    </div>

    <div
      style="
        position: relative;
        display: flex;
        align-items: center;
        width: 100%;
        height: 100%;
      "
    >
      <v-scale-transition leave-absolute origin="center">
        <div
          v-if="!isSearch"
          class="d-flex align-center"
          style="position: absolute; width: 100%"
        >
          <v-toolbar-title>Расписание</v-toolbar-title>

          <v-spacer></v-spacer>

          <v-btn icon @click="$store.commit('CHANGE_SEARCH')">
            <v-icon>mdi-magnify</v-icon>
          </v-btn>
          <v-btn icon @click="changeTheme">
            <!-- <v-icon>mdi-cog</v-icon> -->
            <v-icon>mdi-brightness-6</v-icon>
          </v-btn>
        </div>
      </v-scale-transition>

      <v-scale-transition leave-absolute origin="center">
        <div
          v-if="isSearch"
          class="d-flex align-center"
          style="position: absolute; width: 100%"
        >
          <v-autocomplete
            class="elevation-2"
            v-model="select"
            :search-input.sync="searchText"
            :items="autocomplete"
            :loading="loading"
            dense
            filled
            autofocus
            :no-data-text="noResultText"
            hide-details
            :hide-no-data="loading"
            :placeholder="placholder"
            :prepend-inner-icon="innerIcon"
            :append-icon="''"
            solo
            flat
          ></v-autocomplete>
        </div>
      </v-scale-transition>
    </div>
  </v-app-bar>
</template>

<script>
import SearchAPI from "@/class/SearchAPI";

export default {
  name: "mainNavBarMobile",
  data: () => ({
    loading: false,
    heightAppBar: "75px",
    heightInput: "50px",
    placholder: "Поиск...",
    noResultText: "Необходимо 2 или более символов",
    innerIcon: "mdi-magnify",
    overlayOpacity: "0.2",
    autocomplete: [],

    searchText: null,
    select: null,
  }),
  computed: {
    isSearch() {
      return this.$store.getters.isSearch;
    },
  },
  watch: {
    searchText(val) {
      val && val !== this.select && this.search(val);
    },
    select(val) {
      console.log("watch select: ", val);
    },
  },
  methods: {
    search(value) {
      //? Функция поиска
      // console.clear();

      this.loading = true;
      SearchAPI.query({
        query: value,
        setFunction: this.setResultFunction,
      });
    },

    setResultFunction(obj) {
      console.log(obj);

      if (obj.text == "Идёт поиск..." && !obj.result.length) {
        // console.log('poesk?');
        this.noResultText = obj.text;

        return;
      }

      this.loading = false;
      this.noResultText = obj.text;
      this.autocomplete = obj.result;
    },

    changeTheme() {
      this.$store.commit("CHANGE_THEME");
      this.$vuetify.theme.dark = this.$store.getters.getTheme;
    },

    go(value) {
      //? Функция перехода к найденному расписанию
      console.log(value);
    },
  },
};
</script>

<style>
.fix--overlay--posution {
  position: absolute;
  height: 100vh;
  z-index: 100;
}
</style>
