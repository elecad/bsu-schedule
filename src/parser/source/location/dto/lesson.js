import Content from "./content";

export default class Lesson {
  number = 0;
  startTime = "";
  endTime = "";
  content = [];

  constructor() {}

  get object() {
    //? Получение объекта дня
    if (!this.check) {
      console.error('Объекта "Занятие" получен без ключевых свойств');
    }
    return {
      number: this.number,
      startTime: this.startTime,
      endTime: this.endTime,
      content: this.content,
      isNow: false,
      isToday: false,
    };
  }

  get check() {
    return this.number && this.startTime && this.endTime;
  }

  addContent(Content) {
    this.content.push(Content.object);
  }
}
