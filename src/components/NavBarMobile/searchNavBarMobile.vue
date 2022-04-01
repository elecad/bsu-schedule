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
        v-model="select"
        :search-input.sync="searchText"
        :items="autocomplete"
        :loading="loading"
        allow-overflow
        dense
        filled
        :hide-no-data="loading"
        autofocus
        solo
        :no-data-text="noResultText"
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
  watch: {
    searchText(val) {
      val && val !== this.select && this.search(val);
    },
  },
  methods: {
    search(value) {
      //? Функция поиска
      this.loading = true;
      SearchAPI.query({
        query: value,
        setFunction: this.setResultFunction,
      });
    },

    setResultFunction(obj) {
      console.log(obj);

      if (obj.text == "Идёт поиск..." && !obj.result.length) {
        this.noResultText = obj.text;

        return;
      }

      this.loading = false;
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
