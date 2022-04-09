export default class Day {
  date = "";
  dayWeek = "";

  constructor() {}

  get object() {
    //? Получение объекта дня
    if (!this.check) {
      console.error('Объекта "День" получен без ключевых свойств');
    }
    return {
      date: this.date,
      dayWeek: this.dayWeek,
      today: false,
      lessons: [],
    };
  }

  get check() {
    return this.date && this.dayWeek;
  }
}
