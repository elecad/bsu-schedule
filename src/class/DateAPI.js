import dateFormat from "dateformat";
import { i18n } from "dateformat";

i18n.monthNames = [
  "Янф",
  "Фев",
  "Мар",
  "Апр",
  "Май",
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
  stringDate = "";
  date = null;
  day = 1000 * 60 * 60 * 24; //! Сутки

  constructor(date) {
    this.date = date;
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

  goNextWeek() {
    this.date = new Date(this.date.getTime() + 7 * this.day);
    return this;
  }

  goBackWeek() {
    this.date = new Date(this.date.getTime() - 7 * this.day);
    return this;
  }

  resetDate() {
    this.date = new Date();
    return this;
  }

  getLabel() {
    const monday = this.getMonday();
    const sunday = this.getSunday();
    return `${dateFormat(monday, "d mmm")} - ${dateFormat(sunday, "d mmm")}`;
  }

  getToday(date) {
    return dateFormat(date, "dd.mm.yyyy"); //"04.04.2022"
  }
}
