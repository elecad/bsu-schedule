import Content from "@/parser/source/teacher/dto/content";

export default class contentParser {
  $ = null;
  Content = new Content();
  re =
    /^(\(.*?[^\(]*\))?\s?((?:.*(?=\s\(Э))|(?:.*(?=\s\(с))|.*)\s?(?:\(Э.*(?=\())?(\(с видеотрансляцией\))?.*$/;
  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.typeParse(this.$[0]); //? Ну кто делает ID одинаковым на двух элементах строки таблицы??? ((((
    this.nameParse(this.$[1]);
    this.groupParse(this.$.group);
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

    let href = node.querySelector("#lesson > a");
    if (href) {
      this.Content.addLink("В курс", href.href);
    }
    for (let href of node.querySelectorAll("#lesson > small > a")) {
      this.Content.addLink(href.textContent, href.href);
    }
  }

  locationParse(node) {
    const aLocation = node.querySelector("a");

    if (!aLocation) {
      //? Онлайн курс или что-то другое
      this.Content.locationSpecific = node.textContent.trim();
      this.Content.online =
        node.textContent.trim() == "Онлайн курс" ? true : false;
    } else {
      //? Аудитория + корпус
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

  groupParse(node) {
    const aGroup = node.querySelector("a");
    this.Content.group = aGroup.textContent.trim();
    const idGroup = aGroup.href.split("=")[1];
    this.Content.groupId = idGroup;
    this.Content.groupPromt = node.querySelector("img").title.trim();
  }
}
