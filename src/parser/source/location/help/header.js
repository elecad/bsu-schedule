export default class headerParser {
  $ = null;
  constructor(mainNode) {
    this.$ = mainNode;
  }

  parse() {
    const temp = this.$.querySelector("#h2").textContent.trim();
    return temp;
  }
}
