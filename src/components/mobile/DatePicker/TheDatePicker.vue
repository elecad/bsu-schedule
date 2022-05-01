<template>
  <v-row justify="center" class="my-1">
    <v-btn-toggle tile group>
      <v-btn @click="$emit('back--week')" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-scale-transition>
        <v-badge
          v-if="dateAPI.autoNextWeek"
          color="indigo"
          overlap
          content="АВТО"
          class="auto--badge"
        ></v-badge>
      </v-scale-transition>
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
import SystemUI from "@/class/SystemUI";

export default {
  name: "TheDatePickerMobile",
  props: { dateAPI: Object },
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
  watch: {
    modal(newVal) {
      if (this.$store.getters.getSettings.dark) return;
      if (newVal) {
        SystemUI.overlayOnTheme(200);
        this.unlockAdjacentMonth();
      } else {
        SystemUI.overlayOffTheme(200);
      }
    },
    pickerDate() {
      this.unlockAdjacentMonth();
    },
    dateAPI: {
      handler() {
        this.localeDateAPI.date = this.dateAPI.date;
        let fullWeek = this.localeDateAPI.getFullArrayWeek();
        this.date = [fullWeek[0], fullWeek[6]];

        this.pickerDate = fullWeek[0].substr(0, 7);
      },
      deep: true,
    },
  },
  methods: {
    unlockAdjacentMonth() {
      this.$nextTick(() => {
        for (const el of [
          ...document.querySelectorAll(
            ".v-date-picker-table .v-btn--rounded.v-btn--disabled"
          ),
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
    input(data) {
      this.localeDateAPI.setDate(new Date(data[0]));
      //this.date = this.localeDateAPI.getFullArrayWeek();

      let fullWeek = this.localeDateAPI.getFullArrayWeek();
      this.date = [fullWeek[0], fullWeek[6]];

      let f = data[0].substr(0, 7);

      if (
        !(f == this.pickerDate && f == this.date[1].substr(0, 7)) &&
        (f != this.pickerDate || f == this.date[1].substr(0, 7))
      ) {
        this.pickerDate = f;
      }

      this.events = this.date.filter(
        (el) => el == new Date().toISOString().substr(0, 10)
      );

      this.unlockAdjacentMonth();
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

.auto--badge {
  position: absolute;
  left: calc(50% - 42.39px / 4);
  top: -10px;
}

* >>> .v-date-picker-table.v-date-picker-table--date.theme--dark {
  background-color: #1e1e1e;
}
* >>> .v-date-picker-header.theme--dark {
  background-color: #1e1e1e;
}
</style>
