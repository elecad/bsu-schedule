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
    class="pb-7"
  >
    <!-- <v-spacer></v-spacer>
    <v-btn text color="indigo" @click="submitCurrentWeek" class="">
      Текущая неделя
    </v-btn>
    <v-btn text color="indigo" @click="submit"> Выбрать </v-btn> -->
  </v-date-picker>
</template>

<script>
import dateAPI from "@/class/DateAPI";

export default {
  name: "TheDatePickerDesktop",
  props: { dateISO: String, dateAPI: dateAPI },
  computed: {
    getDataPickerLabel() {
      return this.dateAPI.getDataPickerLabel(this.date);
    },
  },
  created() {
    this.setDate();
  },
  watch: {
    dateAPI: {
      handler(newValue, oldValue) {
        this.setDate();
      },
      deep: true,
    },
  },
  methods: {
    input() {
      if (!this.date.length) return;
      this.$emit("date--week", this.date[0]);
      this.setDate();
    },
    setDate() {
      this.date = this.dateAPI.getFullArrayWeek();
      this.pickerDate = this.date[0];
      this.events = this.date.filter(
        (el) => el == new Date().toISOString().substr(0, 10)
      );
    },
    submitCurrentWeek() {
      this.$emit("date--week", new Date().toISOString().substr(0, 10));
    },
  },
  data: () => ({
    // dateAPI: new dateAPI(new Date(), false),
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
.edit--text--button {
  font-size: 0.875rem;
}

@media (max-width: 315px) {
  .edit--text--button {
    font-size: 0.6rem !important;
  }
}

@media (max-width: 320px) {
  .v-dialog.v-dialog--active {
    margin-left: 3px !important;
    margin-right: 3px !important;
  }
}

.v-btn--text:before {
  display: none;
}
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
