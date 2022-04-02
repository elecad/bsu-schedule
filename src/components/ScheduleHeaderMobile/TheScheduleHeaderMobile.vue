<template>
  <v-card>
    <v-card-title>
      <h3>Группа 12001902</h3>
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
};
</script>

<style scoped></style>
