import dateFormat from "dateformat";

export default class DateAPI {
  stringDate = "";
  date = null;
  day = 1000 * 60 * 60 * 24; //! Сутки

  constructor(str) {
    this.stringDate = str;
    this.date = new Date(str);
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
}
