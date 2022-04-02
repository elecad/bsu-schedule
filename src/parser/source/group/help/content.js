import Content from "@/parser/source/group/dto/content";

export default class contentParser {
  $ = null;
  Content = new Content();
  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.typeParse(this.$[0]); //? Ну кто делает ID одинаковым на двух элементах строки таблицы??? ((((
    this.nameParse(this.$[1]);
    this.teacherParse(this.$.teacher);
    this.locationParse(this.$.aud);
    return this.Content;
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
    this.Content.teacherName = 2 ? FullTeacherNameArray[1] : "";
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
