import Group from "@/parser/source/group/group";

const links = {
  group: ({ group, week }) => {
    return `http://echo.uz/proxy/group.php?group=${group}&week=${week}`;
  },
  teacher: "http://echo.uz/proxy/teacher.php",
  location: "http://echo.uz/proxy/location.php",
  search: "http://echo.uz/proxy/search.php",
};

export default class Parsers {
  htmlText = "";
  constructor() {}
  async fetchGroup({ group, week }) {
    if (!(group && week.length == 16)) {
      throw console.error("Данные переданы некорректно!");
    }
    let response = await fetch(links.group({ group, week }));

    let htmlText = await response.text();
    this.htmlText = htmlText;
  }

  parseGroup() {
    if (!this.htmlText) {
      throw console.error("Парсер имеет пустые данные для парсинга!");
    }
    try {
      let $ = new DOMParser();
      let htmlDoc = $.parseFromString(this.htmlText, "text/html");
      const tables = htmlDoc.querySelectorAll("table");
      const data = new Group({
        headerTable: tables[0],
        sheduleTable: tables[1],
      }).parsing();

      // ! Будущая проверка на корректность возвращаемых данных
      return {
        validate: true,
        data,
      };
    } catch (err) {
      throw Error(err.message);
    }
  }
}
