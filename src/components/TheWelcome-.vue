<template>
  <v-container class="fix--padding--container pa-2">
    <v-expand-transition>
      <app-favorite class="mb-3" v-if="isFavorit"></app-favorite>

      ></v-expand-transition
    >

    <app-schedule-header-mobile
      class="mb-3"
      @add-fovorite-item="isFavorit = !isFavorit"
      :favorit="isFavorit"
    ></app-schedule-header-mobile>

    <app-schedule-content-mobile></app-schedule-content-mobile>
    <v-overlay
      :value="isSearch"
      absolute
      opacity="0.2"
      z-index="6"
      @click="$store.commit('CHANGE_SEARCH')"
    ></v-overlay>
  </v-container>
</template>

<script>
import appFavorite from "@/components/Favorite-/AppFavorite.vue";
import appScheduleHeaderMobile from "@/components/ScheduleHeaderMobile-/TheScheduleHeaderMobile";
import appScheduleContentMobile from "@/components/ScheduleContentMobile-/AppScheduleContentMobile";

export default {
  name: "WelcomePage",
  methods: {},
  components: {
    appFavorite,
    appScheduleHeaderMobile,
    appScheduleContentMobile,
  },

  data: () => ({
    isFavorit: false,
  }),
  computed: {
    isSearch() {
      return this.$store.getters.isSearch;
    },
  },
};
</script>

<style lang="scss">
@media (min-width: 650px) {
  .fix--padding--container {
    width: 600px !important;
  }
}

@media (min-width: 1024px) {
  .fix--padding--container {
    width: 900px !important;
  }
}
</style>
