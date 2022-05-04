<template>
  <v-row justify="center" class="my-1">
    <v-btn-toggle tile group>
      <v-btn @click="$emit('back--week')" text>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-scale-transition>
        <v-badge
          v-if="autoNextWeek"
          color="indigo"
          overlap
          content="АВТО"
          class="auto--badge"
        ></v-badge>
      </v-scale-transition>
      <v-btn class="edit--text--button" @click="modal = !modal" text>
        {{ dateRangeLabelPrev }}
        <v-icon right>mdi-calendar-blank-multiple</v-icon>
      </v-btn>

      <v-btn @click="$emit('next--week')" text>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-dialog v-model="modal" class="dialog--fix">
      <v-date-picker
        :value="dateRange"
        @input="input"
        :picker-date.sync="pickerDate"
        :selected-items-text="dateRangeLabel"
        :events="events"
        :disabled="this.dateRange.length == 0"
        event-color="teal"

        range
        scrollable
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
import SystemUI from "@/class/SystemUI";

export default {
  name: "TheDatePickerMobile",
  props: { 
    dateRange: Array,
    dateRangeLabel: String,
    autoNextWeek: Boolean
  },
  mounted() {
    this.dateRangePrev = this.dateRange;
    this.updatePickerDate();
  },
  computed: {
    dateRangeLabelPrev() {
      if (!this.dateRangePrev.length)
        return '-';
      
      const monthNames = ["Янв", "Фев", "Мар", "Апр", "Мая", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек"];

      return this.dateRangePrev[0].substr(8, 2) + ' ' + monthNames[+this.dateRangePrev[0].substr(5, 2) - 1] +' - ' +
        this.dateRangePrev[1].substr(8, 2) + ' ' + monthNames[+this.dateRangePrev[1].substr(5, 2) - 1];
    }
  },
  watch: {
    modal(newVal) {
      if (newVal) {
        this.dateRangePrev = this.dateRange;
        this.updatePickerDate();
      } else {
        this.$emit('update:dateRange', this.dateRangePrev);
      }

      if (this.$store.getters.getSettings.dark) return;

      if (newVal) {
        SystemUI.overlayOnTheme(200);
      } else {
        SystemUI.overlayOffTheme(200);
      }
    },
    dateRange(n, v) {
      if (this.modal) {
        this.updatePickerDate();
      } else {
        this.dateRangePrev = this.dateRange;
      }
    },
    pickerDate() {
      if (this.modal) {
        this.unlockAdjacentMonth();
      }
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

    input(v) {
      this.d.setTime(Date.parse(v[0]));
      let n = this.d.setHours(12, 0, 0);

      if (n < this.f || n > this.t) {
        this.$emit('update:dateRange', v);
      }

      if (v[0].substr(0, 7) !== this.pickerDate) {
        this.pickerDate = v[0].substr(0, 7);
      }
    },
    
    submit() {
      this.dateRangePrev = this.dateRange;
      this.modal = false;
      this.$emit('date--set');
    },
    submitCurrentWeek() {
      this.d.setTime(Date.now());
      this.$emit('update:dateRange', [this.d.toLocaleDateString('en-CA')]);

      this.$nextTick(() => {
        this.dateRangePrev = this.dateRange;
        this.modal = false;
        this.$emit('date--set');
      });
    },
  },
  data: () => ({
    modal: false,
    dialog: false,
    events: [],
    d: new Date(),
    pickerDate: "",
    dateRangePrev: [],
    isSet: false
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
