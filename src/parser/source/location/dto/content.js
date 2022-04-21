export default class Content {
  type = "";
  subgroup = undefined;
  name = "";
  subname = "";
  online = undefined;
  teacherName = "";
  teacherSurname = "";
  teacherMiddlename = "";
  teacherPost = "";
  teacherId = 0;
  teacherPromt = 0;
  group = "";
  groupPromt = "";
  groupId = 0; //? Кажется, что не нужно, но вдруг что сломается...
  links = [];

  constructor(type) {}

  get object() {
    //? Получение объекта дня
    if (!this.check) {
      console.error('Объект "Контент" получен без ключевых свойств');
    }
    return {
      type: this.type,
      subgroup: this.subgroup,
      subname: this.subname,
      online: this.online,
      name: this.name,
      links: this.links,
      teacher: {
        surname: this.teacherSurname,
        name: this.teacherName,
        middlename: this.teacherMiddlename,
        post: this.teacherPost,
        id: this.teacherId,
        promt: this.teacherPromt,
      },
      group: {
        name: this.group,
        promt: this.groupPromt,
        id: this.groupId,
      },
    };
  }

  get check() {
    return this.type && this.name && this.group && this.groupId;
  }

  addLink(name, href) {
    this.links.push({
      name,
      href,
    });
  }
}
