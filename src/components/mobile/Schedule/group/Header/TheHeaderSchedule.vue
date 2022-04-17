<template>
  <v-card>
    <v-card-title>
      <v-fade-transition leave-absolute>
        <h3 v-if="!loading" class="fix--text">
          {{ header }}
        </h3>
        <v-skeleton-loader
          type="chip"
          class="p-0 m-0 v-skeleton-loader__chip"
          v-if="loading"
        ></v-skeleton-loader>
      </v-fade-transition>

      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('add-fovorite-item')">
        <v-icon>{{ favorit ? "mdi-star" : "mdi-star-outline" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1">
      <app-date-picker-mobile
        :dateISO="dateISO"
        @next--week="$emit('next--week')"
        @back--week="$emit('back--week')"
        @date--week="dateWeek"
      ></app-date-picker-mobile>
    </v-card-text>
  </v-card>
</template>

<script>
import appDatePickerMobile from "@/components/mobile/DatePicker/TheDatePicker.vue";

export default {
  name: "scheduleHeader",
  props: {
    header: String,
    loading: Boolean,
    dateISO: String,
  },

  components: {
    appDatePickerMobile,
  },
  data: () => ({
    favorit: true,
  }),
  methods: {
    dateWeek(date) {
      this.$emit("date--week", date);
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
