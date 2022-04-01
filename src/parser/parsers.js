import Group from "@/parser/source/group/group";
import Teacher from "@/parser/source/teacher/teacher";
import Location from "@/parser/source/location/location";
import Search from "@/parser/source/search/search";

const links = {
  group: ({ group, week }) => {
    return `/bsu/education/schedule/groups/show_schedule.php?group=${group}&week=${week}`;
  },
  teacher: ({ teacher, week }) => {
    return `/bsu/education/schedule/teachers/show_schedule.php?teach=${teacher}&week=${week}`;
  },
  location: ({ location, week }) => {
    return `/bsu/education/schedule/auditories/show_schedule.php?aud=${location}&week=${week}`;
  },
  search: ({ query }) => {
    return `/bsu/education/schedule/search/index.php?query=${query}`;
  },
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

  async fetchTeacher({ teacher, week }) {
    if (!(teacher && week.length == 16)) {
      throw console.error("Данные переданы некорректно!");
    }
    let response = await fetch(links.teacher({ teacher, week }));

    let htmlText = await response.text();
    this.htmlText = htmlText;
    console.log(htmlText);
  }

  parseTeacher() {
    if (!this.htmlText) {
      throw console.error("Парсер имеет пустые данные для парсинга!");
    }
    try {
      let $ = new DOMParser();
      let htmlDoc = $.parseFromString(this.htmlText, "text/html");
      const tables = htmlDoc.querySelectorAll("table");
      const data = new Teacher({
        headerTable: tables[0],
        sheduleTable: tables[1],
      }).parsing();

      return {
        validate: data.header.fullName && data.header.post ? true : false,
        data,
      };
    } catch (err) {
      throw Error(err.message);
    }
  }

  async fetchLocation({ location, week }) {
    if (!(location && week.length == 16)) {
      throw console.error("Данные переданы некорректно!");
    }
    let response = await fetch(links.location({ location, week }));

    let htmlText = await response.text();
    this.htmlText = htmlText;
  }

  parseLocation() {
    if (!this.htmlText) {
      throw console.error("Парсер имеет пустые данные для парсинга!");
    }
    try {
      let $ = new DOMParser();
      let htmlDoc = $.parseFromString(this.htmlText, "text/html");
      const tables = htmlDoc.querySelectorAll("table");
      const data = new Location({
        headerTable: tables[0],
        sheduleTable: tables[1],
      }).parsing();

      return {
        validate: data.header.includes(" "),
        data,
      };
    } catch (err) {
      throw Error(err.message);
    }
  }

  async fetchSearch({ query, signal }) {
    if (!query) {
      throw console.error("Данные переданы некорректно!");
    }

    let response = await fetch(links.search({ query }), { signal });

    let htmlText = await response.text();
    this.htmlText = htmlText;
    return this.parseSearch();
  }

  parseSearch() {
    if (!this.htmlText) {
      throw console.error("Парсер имеет пустые данные для парсинга!");
    }
    try {
      let $ = new DOMParser();
      let htmlDoc = $.parseFromString(this.htmlText, "text/html");
      const tables = htmlDoc.querySelectorAll(".typo-page");
      const data = new Search(tables).parsing();

      let ids = [];
      return data.filter((el) => {
        if (ids.indexOf(el.content.id) != -1 || el.content.post == "н/о")
          return false;

        ids.push(el.content.id);
        return true;
      });
    } catch (err) {
      throw Error(err.message);
    }
  }
}
