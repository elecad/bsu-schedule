import Lesson from "@/parser/source/group/dto/lesson";
import Content from "@/parser/source/group/dto/content";

export default class lessonParser {
  $ = null;
  Lesson = new Lesson();
  Content = new Content();
  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.numberParser(this.$.num);
    this.timeParser(this.$.time);
    this.typeParse(this.$[2]); //? Ну кто делает ID одинаковым на двух элементах строки таблицы??? ((((
    this.nameParse(this.$[3]);
    this.teacherParse(this.$.teacher);
    this.locationParse(this.$.aud);

    this.Lesson.addContent(this.Content);
    return this.Lesson;
  }

  numberParser(node) {
    const temp = node.textContent.trim().split(" ");
    this.Lesson.number = temp[0];
  }

  timeParser(node) {
    const temp = node.textContent.trim().split(" ");
    this.Lesson.startTime = temp[0];
    this.Lesson.endTime = temp[2];
  }

  typeParse(node) {
    const temp = node.textContent.trim();
    //TODO Место для измененя названия типа занятия (может как-то в будущем)
    this.Content.type = temp;
  }

  nameParse(node) {
    const name = node.textContent.replace(/\s+/g, " ").trim();
    //TODO Место для измененя названия дисциплины (может как-то в будущем)
    this.Content.name = name;

    const hrefs = node.querySelectorAll("a");
    for (let i = 0; i < hrefs.length; i++) {
      const aText = hrefs[i].textContent;
      const aName = aText.includes("ЭУМКД") ? aText : "В курс";
      const href = hrefs[i].href;
      this.Content.addLink(aName, href);
    }
  }

  teacherParse(node) {
    this.Content.teacherPost = node.querySelector("small").textContent.trim();

    const aTeacher = node.querySelector("a");

    const FullTeacherNameArray = aTeacher.textContent.trim().split(" ");

    //TODO Место для измененя названия дисциплины (может как-то в будущем)

    this.Content.teacherSurname = FullTeacherNameArray[0];
    this.Content.teacherName =
      FullTeacherNameArray.length >= 2 ? FullTeacherNameArray[1] : "";

    this.Content.teacherMiddlename =
      FullTeacherNameArray.length == 3 ? FullTeacherNameArray[2] : "";
    this.Content.teacherPromt = node.querySelector("img").title.trim();
    this.Content.teacherId = +aTeacher.href.split("=")[1];
  }

  locationParse(node) {
    if (node.childNodes.length == 1) {
      //? Онлайн курс или что-то другое
      this.Content.locationSpecific = node.textContent.trim();
    } else {
      //? Аудитория + корпус
      const aLocation = node.querySelector("a");
      this.Content.locationAud = aLocation.textContent;
      this.Content.locationId = +aLocation.href.split("=")[1];
      this.Content.locationPromt = node.querySelector("img").title.trim();
      this.Content.locationCorp = node.textContent
        .replace(/\s+/g, " ")
        .trim()
        .split(",")[1]
        .trim();
    }
  }
}
