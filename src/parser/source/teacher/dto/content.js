export default class Content {
  type = "";
  name = "";
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
      name: this.name,
      links: this.links,
      group: {
        group: this.group,
        groupPromt: this.groupPromt,
        groupId: this.groupId,
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
