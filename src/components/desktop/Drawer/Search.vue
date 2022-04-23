<template>
  <div>
    <div class="d-flex align-center">
      <v-autocomplete
        class="elevation-2"
        @change="goNewSchedule"
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
  </div>
</template>

<script>
import SearchAPI from "@/class/SearchAPI";

export default {
  name: "Search",
  data: () => ({
    loading: false,
    isSearch: false,
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
  computed: {},
  watch: {
    searchText(val) {
      val && val !== this.select && this.search(val);
    },
    isSearch(newValue) {
      if (newValue) {
        this.stopScroll();
      } else {
        this.startScroll();
      }
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
      if (obj.text == "Идёт поиск..." && !obj.result.length) {
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

    goNewSchedule(value) {
      if (value) {
        if (
          !(
            this.$router.currentRoute.name == value.type &&
            this.$router.currentRoute.params.id == value.id
          )
        ) {
          this.$router.push({ name: value.type, params: { id: value.id } });
        }
        this.isSearch = false;
        this.select = "";
        this.searchText = "";
        this.autocomplete = [];
      }
    },
    stopScroll() {
      document.body.style.overscrollBehaviorY = "contain";
      document.querySelector("html").style.overflow = "hidden";
    },
    startScroll() {
      document.body.style.overscrollBehaviorY = "auto";
      document.querySelector("html").style.overflow = "auto";
    },
  },
};
</script>

<style></style>
