import groupParser from "@/parser/source/search/help/group";
import teacherParser from "@/parser/source/search/help/teacher";
import locationParser from "@/parser/source/search/help/location";

export default class searchScheduleParser {
  $ = null;
  max = 10;

  result = [];

  types = {
    Группы: "group",
    Преподаватели: "teacher",
    Аудитории: "location",
  };

  parsers = {
    group: (node) => {
      for (let i = 0; i < node.rows.length && i < this.max; i++) {
        const strockNode = node.rows[i];
        const data = new groupParser(strockNode).parse();
        this.result.push({ type: "group", content: data });
      }
    },
    teacher: (node) => {
      for (let i = 0; i < node.rows.length && i < this.max; i++) {
        const strockNode = node.rows[i];
        const data = new teacherParser(strockNode).parse();
        this.result.push({ type: "teacher", content: data });
      }
    },
    location: (node) => {
      for (let i = 0; i < node.rows.length && i < this.max; i++) {
        const strockNode = node.rows[i];
        const data = new locationParser(strockNode).parse();
        this.result.push({ type: "location", content: data });
      }
    },
    error: () => {
      throw Error("Тип поиска некорректен!");
    },
  };

  code = -1;
  constructor(tables) {
    if (!tables) {
      console.error("Ошибка! Таблицы для парсинга не переданы...");
    }
    this.$ = tables;
  }

  parsing() {
    try {
      const nodes = this.$[0].querySelectorAll("h2, .search");
      if (!nodes) {
        throw Error("Данные поиска некорректны!");
      }

      let type = "error";
      for (let i = 0; i < nodes.length; i++) {
        if (nodes[i].localName == "h2") {
          type = this.selectType(nodes[i].textContent);
        } else {
          this.parsers[type](nodes[i]);
        }
      }
      return this.result;
    } catch (err) {
      throw Error(err.message);
    }
  }

  selectType(textNode) {
    const nameType = textNode.split(",")[0].trim();
    return this.types[nameType];
  }
}
