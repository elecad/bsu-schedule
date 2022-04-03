<template>
  <v-card>
    <v-card-title>
      <h3>{{ stateHeader }}</h3>
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
  },
};
</script>

<style scoped></style>
