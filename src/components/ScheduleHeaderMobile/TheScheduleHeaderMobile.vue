<template>
  <v-card>
    <v-card-title>
      <v-fade-transition leave-absolute>
        <h3 v-if="!isLoading" class="fix--text">
          {{ stateHeader }}
          <small class="text--disabled font-weight-medium text-caption"
            >(βeta)</small
          >
        </h3>
        <v-skeleton-loader
          type="chip"
          class="p-0 m-0 v-skeleton-loader__chip"
          v-if="isLoading"
        ></v-skeleton-loader>
      </v-fade-transition>

      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('add-fovorite-item')">
        <v-icon>{{ favorit ? "mdi-star" : "mdi-star-outline" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1">
      <app-date-picker-mobile></app-date-picker-mobile>
    </v-card-text>
  </v-card>
</template>

<script>
import appDatePickerMobile from "@/components/ScheduleHeaderMobile/TheDatePickerMobile";

export default {
  name: "TheScheduleHeaderMobile",
  props: {
    favorit: Boolean,
  },
  components: {
    appDatePickerMobile,
  },
  computed: {
    stateHeader() {
      return this.$store.getters.getHeader;
    },

    isLoading() {
      return this.$store.getters.isLoading;
    },
  },
};
</script>

<style>
.v-skeleton-loader__chip {
  width: 150px !important;
}

.fix--text {
  overflow: visible;
  white-space: nowrap;
}

@media (max-width: 317px) {
  .fix--text {
    font-size: 1.1rem !important;
  }
}
</style>
