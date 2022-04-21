export default class Content {
  type = "";
  subgroup = undefined;
  name = "";
  subname = "";
  online = undefined;
  group = "";
  groupPromt = "";
  groupId = 0; //? Кажется, что не нужно, но вдруг что сломается...
  locationAud = "";
  locationCorp = "";
  locationId = 0;
  locationPromt = "";
  locationSpecific = "";
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
      group: {
        name: this.group,
        promt: this.groupPromt,
        id: this.groupId,
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
    return this.type && this.name && this.group && this.groupId;
  }

  addLink(name, href) {
    this.links.push({
      name,
      href,
    });
  }
}
