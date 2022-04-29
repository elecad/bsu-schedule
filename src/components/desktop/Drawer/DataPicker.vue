<template>
  <v-date-picker
    @input="input"
    v-model="date"
    locale="ru"
    first-day-of-week="1"
    show-adjacent-months
    show-current
    :events="events"
    :selected-items-text="getDataPickerLabel"
    :picker-date.sync="pickerDate"
    event-color="teal"
    range
    flat
    header-color="indigo"
    full-width
    elevation="2"
    class="pb-5"
  >
  </v-date-picker>
</template>

<script>
import dateAPI from "@/class/DateAPI";

export default {
  name: "TheDatePickerDesktop",
  props: { dateAPI: dateAPI },
  computed: {
    getDataPickerLabel() {
      return this.dateAPI.getDataPickerLabel(this.date);
    },
  },
  mounted() {
    this.setDate();
  },
  watch: {
    dateAPI: {
      handler() {
        this.setDate();
      },
      deep: true,
    },
    pickerDate() {
      this.unlockAdjacentMonth();
    },
  },
  methods: {
    unlockAdjacentMonth() {
      this.$nextTick(() => {
        for (const el of [
          ...this.$el.getElementsByClassName("v-btn--rounded v-btn--disabled"),
        ]) {
          el.disabled = false;
          el.style.pointerEvents = "auto";

          if (el.classList.contains("v-btn--active")) {
            el.style.setProperty("background-color", "#82b1ff26", "important");
          } else {
            el.style.removeProperty("background-color");
          }
        }
      });
    },
    input() {
      if (this.date[0].substr(0, 7) !== this.pickerDate) {
        this.pickerDate = this.date[0].substr(0, 7);
      }

      if (!this.date.length) return;

      let fullWeek = this.dateAPI.getFullArrayWeek();
      fullWeek = [fullWeek[0], fullWeek[6]];

      let e = new Date(this.date[0]).setHours(0, 0, 0);
      let f = new Date(fullWeek[0]).setHours(0, 0, 0);
      let t = new Date(fullWeek[1]).setHours(23, 59, 59);

      if (!(e >= f && e <= t)) {
        this.$emit("date--week", this.date[0]);
      } else {
        this.date = fullWeek;
      }
    },
    setDate() {
      let fullWeek = this.dateAPI.getFullArrayWeek();
      this.date = [fullWeek[0], fullWeek[6]];

      let f = this.date[0].substr(0, 7);

      if (f != this.pickerDate && f == this.date[1].substr(0, 7)) {
        this.pickerDate = f;
      }

      this.events = this.date.filter(
        (el) => el == new Date().toISOString().substr(0, 10)
      );

      this.unlockAdjacentMonth();
    },
    submitCurrentWeek() {
      this.$emit("date--week", new Date().toISOString().substr(0, 10));
    },
  },
  data: () => ({
    modal: false,
    dialog: false,
    events: [],
    date: [],
    multiplay: false,
    pickerDate: "",
  }),
};
</script>

<style scoped>
* >>> .v-date-picker-table {
  font-size: 10px !important;
}

* >>> .v-picker__title__btn {
  font-size: 1.4rem !important;
}

* >>> .v-date-picker-title__year {
  font-size: 1rem !important;
}
</style>
