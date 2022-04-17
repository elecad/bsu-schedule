<template>
  <intersect
    @enter="enterDay($event)"
    @leave="leaveDay($event)"
    :threshold="[1]"
  >
    <v-card class="mb-3 elevation-2 fix--position--day--card" color="indigo">
      <div class="now--day" v-if="today">●</div>
      <v-card-title class="py-1">
        <v-card-title class="white--text py-1 fix--day--name">{{
          week
        }}</v-card-title>
        <v-spacer></v-spacer>
        <v-card-subtitle class="white--text py-1">{{
          date
        }}</v-card-subtitle></v-card-title
      >
    </v-card>
  </intersect>
</template>

<script>
import Intersect from "vue-intersect";

export default {
  name: "AppDayHeader",
  components: { Intersect },
  props: {
    week: String,
    date: String,
    today: Boolean,
  },
  methods: {
    enterDay(event) {
      if (event[0].intersectionRatio) {
        event[0].target.classList.remove("active-fly");
      }
    },
    leaveDay(event) {
      if (event[0].intersectionRatio) {
        event[0].target.classList.add("active-fly");
      }
    },
  },
};
</script>

<style scoped>
.fix--position--day--card {
  position: sticky !important;
  top: -1px;
  z-index: 6;
}

.fix--position--day--card.active-fly {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

.now--day {
  color: white;
  position: absolute;
  top: 12px;
  left: 15px;
}

@media (max-width: 317px) {
  .fix--day--name {
    font-size: 1.05rem !important;
  }
}
</style>
