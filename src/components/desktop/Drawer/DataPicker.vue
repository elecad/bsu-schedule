<template>
  <v-date-picker
    :value="dateRange"
    @input="input"
    :picker-date.sync="pickerDate"
    :selected-items-text="dateRangeLabel"
    :events="events"
    :disabled="this.dateRange.length == 0"
    event-color="teal"

    range
    show-adjacent-months
    show-current
    locale="ru"
    first-day-of-week="1"
    flat
    header-color="indigo"
    full-width
    elevation="2"
    class="pb-5"
  >
  </v-date-picker>
</template>

<script>
export default {
  name: "TheDatePickerDesktop",
  props: { 
    dateRange: Array,
    dateRangeLabel: String
  },
  mounted() {
    this.updatePickerDate();
  },
  watch: {
    dateRange() {
      this.updatePickerDate();
    },
    pickerDate() {
      this.unlockAdjacentMonth();
    }
  },
  methods: {
    updatePickerDate() {
      if (!this.dateRange.length) {
        return;
      }

      this.d.setTime(Date.parse(this.dateRange[0]));
      this.f = this.d.setHours(0, 0, 0);

      this.d.setTime(Date.parse(this.dateRange[1]))
      this.t = this.d.setHours(23, 59, 59);

      let n = Date.now();

      if (n >= this.f && n <= this.t) { // uh
        this.events = [new Date().toLocaleDateString('en-CA')];
      } else {
        this.events = [];
      }

      if (this.pickerDate != this.dateRange[0].substr(0, 7) && this.pickerDate != this.dateRange[1].substr(0, 7)) {
        this.pickerDate = this.dateRange[0].substr(0, 7);
      }

      this.unlockAdjacentMonth();
    },

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

    input(v) {
      this.d.setTime(Date.parse(v[0]));
      let n = this.d.setHours(12, 0, 0);

      if (n < this.f || n > this.t) {
        this.$emit('update:dateRange', v);

        this.$nextTick(() => {
          this.$emit('date--set');
        });
      }

      if (v[0].substr(0, 7) !== this.pickerDate) {
        this.pickerDate = v[0].substr(0, 7);
      }
    },
  },
  data: () => ({
    modal: false,
    dialog: false,
    d: new Date(),
    f: null,
    t: null,
    events: [],
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

* >>> .v-date-picker-table.v-date-picker-table--date.theme--dark {
  background-color: #1e1e1e;
}

* >>> .v-date-picker-header.theme--dark {
  background-color: #1e1e1e;
}
</style>
