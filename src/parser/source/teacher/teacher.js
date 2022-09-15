import headerParser from "@/parser/source/teacher/help/header";
import dayParser from "@/parser/source/teacher/help/day";
import lessonParser from "@/parser/source/teacher/help/lesson";
import contentParser from "@/parser/source/teacher/help/content";

export default class teacherScheduleParser {
  $ = { header: null, schedule: null };

  result = [];
  header = {
    fullName: "",
    post: "",
  };

  code = -1;
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
        // TODO: Пара для нескольких групп
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
