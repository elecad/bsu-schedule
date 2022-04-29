<template>
  <div>
    <v-overlay
      opacity="0.46"
      class="overlay--fix"
      :value="isSearch"
      @click="isSearch = !isSearch"
    ></v-overlay>
    <v-app-bar height="60px" class="z--index--app--bar--fix">
      <div class="mr-2" style="positon: relative; width: 24px; height: 24px">
        <v-fade-transition leave-absolute>
          <v-icon v-if="!isSearch" style="position: absolute">
            mdi-school-outline
          </v-icon>
        </v-fade-transition>

        <v-fade-transition leave-absolute>
          <v-icon v-if="isSearch" @click="isSearch = !isSearch">
            mdi-arrow-left
          </v-icon>
        </v-fade-transition>
      </div>

      <div class="fix--search--position ml-2">
        <v-scale-transition leave-absolute origin="center">
          <div v-if="!isSearch" class="d-flex align-center" style="width: 100%">
            <v-toolbar-title>Расписание</v-toolbar-title>

            <v-spacer></v-spacer>

            <v-btn icon @click="isSearch = !isSearch">
              <v-icon>mdi-magnify</v-icon>
            </v-btn>

            <v-btn icon @click="$emit('open--favorite')">
              <v-icon>mdi-calendar-star</v-icon>
            </v-btn>

            <v-btn icon @click="$emit('open--settings')">
              <v-icon>mdi-cog</v-icon>
              <!-- <v-icon>mdi-brightness-6</v-icon> -->
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
              @change="goNewSchedule"
              v-model.trim="select"
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
  </div>
</template>

<script>
import SearchAPI from "@/class/SearchAPI";

export default {
  name: "mainNavBarMobile",
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
      // console.clear();

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

<style>
.fix--overlay--posution {
  position: absolute;
  height: 100vh;
  z-index: 9;
}
.fix--search--position {
  position: relative;
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
}

.z--index--app--bar--fix {
  z-index: 10 !important;
}

.v-toolbar__content {
  padding-right: 4px !important;
}

@media (max-width: 315px) {
  .v-toolbar__content {
    padding-left: 4px !important;
    padding-right: 4px !important;
  }
  .v-toolbar__title {
    font-size: 1.1rem !important;
  }
}

.overlay--fix {
  display: absolute !important;
  height: 100vh;
  z-index: 10 !important;
}
</style>
