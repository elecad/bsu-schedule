<template>
  <v-card class="mb-3">
    <v-card-title>
      <h3>Группа 12001902</h3>
      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('add-fovorite-item')">
        <v-icon>{{ favorit ? "mdi-star" : "mdi-star-outline" }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="px-1">
      <v-divider class="my-2"></v-divider>

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
};
</script>

<style scoped></style>
