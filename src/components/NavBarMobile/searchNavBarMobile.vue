<template>
  <div>
    <v-app-bar
      class="navbar-mobile--search"
      :height="heightAppBar"
      rounded
      :class="{
        'search-mobile-active': open,
        'elevation-4': open,
      }"
    >
      <v-btn icon class="mr-1" @click="$emit('search-close-mobile')">
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>

      <v-autocomplete
        @update:search-input="search"
        @change="go"
        allow-overflow
        dense
        filled
        autofocus
        solo
        :no-data-text="noResultText"
        :items="autocomplete"
        hide-details
        :placeholder="placholder"
        :prepend-inner-icon="innerIcon"
        :height="heightInput"
      ></v-autocomplete>
    </v-app-bar>

    <v-overlay
      :value="open"
      :opacity="overlayOpacity"
      @click="$emit('search-close-mobile')"
    ></v-overlay>
  </div>
</template>

<script>
import SearchAPI from "@/class/SearchAPI";

export default {
  name: "searchNavBarMobile",
  props: {
    open: Boolean,
  },
  data: () => ({
    heightAppBar: "75px",
    heightInput: "50px",
    placholder: "Поиск...",
    noResultText: "Необходимо 2 или более символов",
    innerIcon: "mdi-magnify",
    overlayOpacity: "0.2",
    searchText: "",
    autocomplete: [],
  }),
  methods: {
    search(value) {
      //? Функция поиска
      console.clear();
      SearchAPI.query({
        query: value,
        setFunction: this.setResultFunction,
      });
    },

    setResultFunction(obj) {
      this.noResultText = obj.text;
      this.autocomplete = obj.result;
    },

    go(value) {
      //? Функция перехода к найденному расписанию
      console.log(value);
    },
  },
};
</script>

<style></style>
