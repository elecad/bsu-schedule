export default class groupParser {
  $ = null;
  result = {};

  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.groupParser(this.$[0]);
    this.instituteParse(this.$[1]);
    this.typeOfLearningParse(this.$[2]);
    return this.result;
  }

  groupParser(node) {
    const aGroup = node.querySelector("a");
    const idGroup = aGroup.href.split("=")[1];
    const nameGroup = node.querySelector("a").textContent;
    this.result.name = nameGroup;
    this.result.id = idGroup;
  }

  instituteParse(node) {
    const name = node.textContent;
    this.result.institute = name;
  }

  typeOfLearningParse(node) {
    const type = node.textContent;
    this.result.typeLearning = type;
  }
}
