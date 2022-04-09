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
  locationAud = "";
  locationCorp = "";
  locationId = "";
  locationPromt = "";
  locationSpecific = "";
  links = [];

  constructor(type) {}

  get object() {
    //? Получение объекта дня
    if (!this.check) {
      console.error('Объекта "Контент" получен без ключевых свойств');
    }
    return {
      type: this.type,
      subgroup: this.subgroup,
      name: this.name,
      subname: this.subname,
      online: this.online,
      links: this.links,
      teacher: {
        surname: this.teacherSurname,
        name: this.teacherName,
        middlename: this.teacherMiddlename,
        post: this.teacherPost,
        id: this.teacherId,
        promt: this.teacherPromt,
      },
      location: {
        aud: this.locationAud,
        corp: this.locationCorp,
        id: this.locationId,
        prompt: this.locationPromt,
        specific: this.locationSpecific,
      },
    };
  }

  get check() {
    return this.type && this.name;
  }

  addLink(name, href) {
    this.links.push({
      name,
      href,
    });
  }
}
