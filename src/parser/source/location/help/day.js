import Day from "@/parser/source/location/dto/day.js";

export default class dayParser {
  $ = null;
  Day = new Day();
  constructor(mainNode) {
    this.$ = mainNode;
  }

  parse() {
    const dateDay = this.$.textContent.trim().split(" "); //? ['14.03.2022', 'Понедельник']
    this.Day.date = dateDay[0];
    this.Day.dayWeek = dateDay[1];
    return this.Day;
  }
}
