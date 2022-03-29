export default class headerParser {
  $ = null;
  constructor(mainNode) {
    this.$ = mainNode;
  }

  parse() {
    const nodes = this.$.rows[0].cells[0].childNodes;
    const post = nodes[0].textContent.trim();
    const fullName = nodes[1].textContent.trim();
    return { fullName, post };
  }
}
