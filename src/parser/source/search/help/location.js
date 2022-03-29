export default class audParser {
  $ = null;
  result = {};

  constructor(mainNode) {
    this.$ = mainNode.cells;
  }

  parse() {
    this.audParse(this.$[0]);
    this.corpusParse(this.$[1]);
    this.addressParse(this.$[2]);
    return this.result;
  }

  audParse(node) {
    //? Аудитория + корпус
    const aLocation = node.querySelector("a");
    this.result.aud = aLocation.textContent;
    this.result.id = +aLocation.href.split("=")[1];
  }

  corpusParse(node) {
    const corp = node.textContent;
    this.result.corp = corp;
  }

  addressParse(node) {
    const addr = node.textContent;
    this.result.address = addr;
  }
}
