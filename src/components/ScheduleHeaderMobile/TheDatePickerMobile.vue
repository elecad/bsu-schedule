<template>
  <v-row justify="center" class="my-1">
    <v-btn-toggle rounded tile group>
      <v-btn>
        <v-icon>mdi-arrow-left</v-icon>
      </v-btn>
      <v-btn class="edit--text--button" @click="modal = !modal">
        28 Мар - 31 Апр
        <v-icon right>mdi-calendar-blank-multiple</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-arrow-right</v-icon>
      </v-btn>
    </v-btn-toggle>

    <v-dialog v-model="modal" class="dialog--fix">
      <v-date-picker
        v-model="date"
        scrollable
        locale="ru"
        first-day-of-week="1"
        show-adjacent-months
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false">
          Текущая неделя
        </v-btn>
        <v-btn text color="primary" @click="modal = false"> Ок </v-btn>
      </v-date-picker>
    </v-dialog>
  </v-row>
</template>

<script>
export default {
  name: "TheDatePickerMobile",
  data: () => ({
    modal: false,
    dialog: false,
    date: "",
    date: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
      .toISOString()
      .substr(0, 10),
  }),
};
</script>

<style>
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
</style>
