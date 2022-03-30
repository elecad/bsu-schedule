<template>
  <v-container>
    <h1>Это будущее Расписание...</h1>
    <h2>Звучит неоднозначно, но...</h2>
    <h4>Нужно только подождать :)</h4>
    <v-dialog
      ref="dialog"
      v-model="modal"
      :return-value.sync="date"
      persistent
      width="290px"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-text-field
          v-model="date"
          label="Выбор даты"
          prepend-icon="mdi-calendar"
          readonly
          v-bind="attrs"
          v-on="on"
        ></v-text-field>
      </template>
      <v-date-picker
        v-model="date"
        scrollable
        locale="ru"
        first-day-of-week="1"
        show-adjacent-months
      >
        <v-spacer></v-spacer>
        <v-btn text color="primary" @click="modal = false"> Назад </v-btn>
        <v-btn text color="primary" @click="$refs.dialog.save(date)">
          Ок
        </v-btn>
      </v-date-picker>
    </v-dialog>
    <v-btn color="primary" elevation="2" @click="calcDate"
      >Посчитать даты</v-btn
    >
  </v-container>
</template>

<script>
import Parsers from "@/parser/parsers.js";
export default {
  name: "WelcomePage",
  methods: {
    async calcDate() {
      console.clear();

      const Fetch = new Parsers();

      await Fetch.fetchGroup({ group: "12001902", week: "2802202206032022" });

      const schedule = Fetch.parseGroup();
      console.log(schedule);

      // const dateAPI = new DateAPI(this.date);
      // console.log(dateAPI.getDateForBsuAPI());
    },
  },

  data: () => ({
    date: new Date(Date.now()).toISOString().substr(0, 10),
    modal: false,
  }),
};
</script>
