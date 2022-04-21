import Lesson from "@/parser/source/location/dto/lesson";
import Content from "@/parser/source/location/dto/content";

export default class lessonParser {
  $ = null;
  Lesson = new Lesson();
  Content = new Content();
  re =
    /^(\(.*?[^\(]*\))?\s?((?:.*(?=\s\(Э))|(?:.*(?=\s\(с))|.*)\s?(?:\(Э.*(?=\())?(\(с видеотрансляцией\))?.*$/;
  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.numberParser(this.$.num);
    this.timeParser(this.$.time);
    this.typeParse(this.$[2]); //? Ну кто делает ID одинаковым на двух элементах строки таблицы??? ((((
    this.nameParse(this.$[3]);
    this.teacherParse(this.$.teacher);
    this.groupParse(this.$.aud); //? Да-да-да, группы там имеют id = 'aud'

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
    let m = null;
    m = this.re.exec(name);
    if (m !== null) {
      this.Content.subgroup = m[1]
        ? m[1]
            .replace("(", "")
            .replace(")", "")
            .replace("п/г ", "")
            .replace("подгруппа", "п/г")
            .replace("русский язык как иностранный", "рус. яз.")
            .replace("русский язык как иностанный", "рус. яз.")
            .replace("иностранный язык", "ин. яз.")
            .replace("немецкий язык", "нем. яз.")
        : "";
      this.Content.subname = m[3] ? m[3] : "";
      this.Content.name = m[2] ? m[2] : "";
      // (m[3] ? ' <small class="text--disabled">' + m[3] + "</small>" : "");
    } else {
      this.Content.name = name;
    }

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
    this.Content.teacherName = FullTeacherNameArray[1];
    this.Content.teacherMiddlename =
      FullTeacherNameArray.length == 3 ? FullTeacherNameArray[2] : "";
    this.Content.teacherPromt = node.querySelector("img").title.trim();
    this.Content.teacherId = +aTeacher.href.split("=")[1];
  }

  groupParse(node) {
    const aGroup = node.querySelector("a");
    this.Content.group = aGroup.textContent.trim();
    const idGroup = aGroup.href.split("=")[1];
    this.Content.groupId = aGroup.textContent.trim();
    this.Content.groupPromt = node.querySelector("img").title.trim();
  }
}
