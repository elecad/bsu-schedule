export default class teacherParser {
  $ = null;
  result = {};

  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.teacherParser(this.$[0]);
    this.departmentParse(this.$[1]);
    this.instituteParse(this.$[2]);
    return this.result;
  }

  teacherParser(node) {
    this.result.post = node.querySelector("small").textContent.trim();

    const aTeacher = node.querySelector("a");
    const FullTeacherNameArray = aTeacher.textContent.trim().split(" ");
    //TODO Место для измененя названия дисциплины (может как-то в будущем)

    this.result.Surname = FullTeacherNameArray[0];
    this.result.Name = 2 ? FullTeacherNameArray[1] : "";
    this.result.Middlename =
      FullTeacherNameArray.length >= 3 ? FullTeacherNameArray[2] : "";
    this.result.id = +aTeacher.href.split("=")[1];
  }

  instituteParse(node) {
    const name = node.textContent;
    this.result.institute = name;
  }

  departmentParse(node) {
    const type = node.textContent;
    this.result.department = type;
  }
}
