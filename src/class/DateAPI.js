import dateFormat from "dateformat";
import { i18n } from "dateformat";

i18n.monthNames = [
  "Янв",
  "Фев",
  "Мар",
  "Апр",
  "Мая",
  "Июн",
  "Июл",
  "Авг",
  "Сен",
  "Окт",
  "Ноя",
  "Дек",
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

export default class DateAPI {
  date = null;
  day = 1000 * 60 * 60 * 24; //! Сутки
  autoNextWeek = false;

  constructor(date, setting) {
    console.log(setting);
    this.date = date;
    if (
      this.weekPosition() == 6 &&
      setting &&
      this.getTodayBsuAPI(this.date) == this.getTodayBsuAPI(new Date())
    ) {
      this.date = new Date(this.date.getTime() + 7 * this.day);
      this.autoNextWeek = true;
    }
  }

  getMonday() {
    const monday = new Date(
      this.date.getTime() - this.weekPosition() * this.day
    );
    return monday;
  }

  getSunday() {
    const sunday = new Date(
      this.date.getTime() + (6 - this.weekPosition()) * this.day
    );
    return sunday;
  }

  weekPosition() {
    const index = this.date.getDay();
    return index ? index - 1 : 6;
  }

  getDateForBsuAPI() {
    //? 21 03 2022 27 03 2022
    const monday = this.getMonday();
    const sunday = this.getSunday();

    return dateFormat(monday, "ddmmyyyy") + dateFormat(sunday, "ddmmyyyy");
  }

  getMainData() {
    return this.date;
  }

  getMainDataISO() {
    return this.date.toISOString().substr(0, 10);
  }
  goNextWeek() {
    this.autoNextWeek = false;
    this.date = new Date(this.date.getTime() + 7 * this.day);
    return this;
  }

  goBackWeek() {
    this.autoNextWeek = false;
    this.date = new Date(this.date.getTime() - 7 * this.day);
    return this;
  }

  resetDate() {
    this.autoNextWeek = false;
    this.date = new Date();
    return this;
  }

  setDate(date) {
    this.autoNextWeek = false;
    this.date = date;
    return this;
  }

  getDateISO() {
    return this.date.toISOString().substr(0, 10);
  }
  getLabel() {
    const monday = this.getMonday();
    const sunday = this.getSunday();
    return `${dateFormat(monday, "d mmm")} - ${dateFormat(sunday, "d mmm")}`;
  }

  getTodayBsuAPI(date) {
    return dateFormat(date, "dd.mm.yyyy"); //"04.04.2022"
  }

  getFullArrayWeek() {
    return [...Array(7)].map((_, index) => {
      const monday = this.getMonday();
      return new Date(monday.getTime() + index * this.day)
        .toISOString()
        .substr(0, 10);
    });
  }

  getDataPickerLabel(arr) {
    return `${dateFormat(arr[0], "dd mmm")} - ${dateFormat(
      arr[arr.length - 1],
      "dd mmm"
    )}`;
  }

  get autoNextWeek() {
    return this.autoNextWeek;
  }
}
