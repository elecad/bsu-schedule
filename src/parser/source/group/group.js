// import dayParser from "@/parsers/group/help/day";
import dayParser from "@/parser/source/group/help/day";
import lessonParser from "@/parser/source/group/help/lesson";
import contentParser from "@/parser/source/group/help/content";
import headerParser from "@/parser/source/group/help/header";

export default class groupScheduleParser {
  $ = { header: null, schedule: null }; //? Основная node таблицы для парсинга
  header = "";
  result = []; //? Основной массив расписания

  code = -1; //? Код завершения парсинга

  constructor({ headerTable, scheduleTable }) {
    if (!headerTable) {
      throw "Ошибка! Передан нулевой DOM-элемент элемент заголовока для парсинга...";
    }
    if (!scheduleTable) {
      throw "Ошибка! Передан нулевой DOM-элемент расписания для парсинга...";
    }

    this.$.header = headerTable;
    this.$.schedule = scheduleTable;
  }

  parsing() {
    //? Основная парсинг-функция
    try {
      this.header = new headerParser(this.$.header).parse(); //? Парсинг заголовка
      for (let i = 0; i < this.$.schedule.rows.length; i++) {
        const strockNode = this.$.schedule.rows[i];
        this.selectParserFunction(strockNode);
      }
      return this.schedule;
    } catch (err) {
      throw err;
    }
  }

  selectParserFunction(strockNode) {
    const stlb = strockNode.cells.length;
    switch (stlb) {
      case 1:
        // TODO: Добавить новый день
        const Day = new dayParser(strockNode).parse();
        this.addDay(Day);
        break;
      case 4:
        // TODO: Пара для подгруппы
        const Content = new contentParser(strockNode).parse();
        this.addContent(Content);
        break;
      case 6:
        // TODO: Полная пара
        const Lesson = new lessonParser(strockNode).parse();
        this.addLesson(Lesson);
        break;
      default:
        break;
    }
  }

  addDay(Day) {
    this.result.push(Day.object);
  }

  addLesson(Lesson) {
    this.result[this.index].lessons.push(Lesson.object);
  }

  addContent(Content) {
    this.result[this.index].lessons[this.lessonsIndex].content.push(
      Content.object
    );
  }

  get index() {
    //? Индекс крайнего дня
    return this.result.length - 1;
  }

  get lessonsIndex() {
    //? Индекс крайнего занятия
    return this.result[this.index].lessons.length - 1;
  }

  get schedule() {
    //? Результат парсинга возвращается этим методом
    return {
      header: this.header,
      schedule: this.result,
    };
  }
}
