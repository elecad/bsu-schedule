import headerParser from "@/parser/source/teacher/help/header";
import dayParser from "@/parser/source/teacher/help/day";
import lessonParser from "@/parser/source/teacher/help/lesson";
import contentParser from "@/parser/source/teacher/help/content";

export default class teacherScheduleParser {
  $ = { header: null, shedule: null };

  result = [];
  header = {
    fullName: "",
    post: "",
  };

  code = -1;
  constructor({ headerTable, sheduleTable }) {
    if (!headerTable) {
      console.error(
        "Ошибка! Передан нулевой DOM-элемент элемент заголовока для парсинга..."
      );
    }
    if (!sheduleTable) {
      console.error(
        "Ошибка! Передан нулевой DOM-элемент расписания для парсинга..."
      );
    }

    this.$.header = headerTable;
    this.$.shedule = sheduleTable;
  }

  parsing() {
    try {
      this.header = new headerParser(this.$.header).parse(); //? Парсинг заголовка

      for (let i = 0; i < this.$.shedule.rows.length; i++) {
        const strockNode = this.$.shedule.rows[i];
        this.selectParserFunction(strockNode);
      }
      return this.shedule;
    } catch (err) {
      throw Error(err.message);
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

  get shedule() {
    //? Результат парсинга возвращается этим методом
    return {
      header: this.header,
      shedule: this.result,
    };
  }
}
