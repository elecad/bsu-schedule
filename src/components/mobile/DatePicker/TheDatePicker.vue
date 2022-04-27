<template>
  <v-row justify="center" class="my-1">
    <v-btn-toggle tile group>
      <v-btn @click="$emit('back--week')" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn class="edit--text--button" @click="modal = !modal" text>
        {{ getLabel }}
        <v-icon right>mdi-calendar-blank-multiple</v-icon>
      </v-btn>

      <v-btn @click="$emit('next--week')" text>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-dialog v-model="modal" class="dialog--fix">
      <v-date-picker
        full-width
        @input="input"
        v-model="date"
        scrollable
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
      >
        <v-spacer></v-spacer>
        <v-btn text color="indigo" @click="submitCurrentWeek">
          Текущая неделя
        </v-btn>
        <v-btn text color="indigo" @click="submit"> Выбрать </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-row>
</template>

<script>
import dateAPI from "@/class/DateAPI";

export default {
  name: "TheDatePickerMobile",
  props: { dateISO: String, dateAPI: Object },
  computed: {
    getLabel() {
      return this.dateAPI.getLabel();
    },
    getDataPickerLabel() {
      return this.dateAPI.getDataPickerLabel(this.date);
    },
  },
  created() {
    this.input([this.dateAPI.getMainDataISO()]);
  },
  methods: {
    input(data) {
      this.localeDateAPI.setDate(new Date(data[0]));
      this.date = this.localeDateAPI.getFullArrayWeek();
      this.pickerDate = this.date[0];

      this.events = this.date.filter(
        (el) => el == new Date().toISOString().substr(0, 10)
      );
    },
    submit() {
      this.$emit("date--week", this.date[0]);
      this.modal = false;
    },
    submitCurrentWeek() {
      this.$emit("date--week", new Date().toISOString().substr(0, 10));
      this.modal = false;
    },
  },
  data: () => ({
    localeDateAPI: new dateAPI(new Date(), false),
    modal: false,
    dialog: false,
    events: [],
    date: [],
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

* >>> .v-dialog.v-dialog--active {
  max-width: 350px !important;
}

@media (max-width: 320px) {
  * >>> .v-dialog.v-dialog--active {
    margin-left: 3px !important;
    margin-right: 3px !important;
  }
}

.v-btn--text:before {
  display: none;
}
</style>
