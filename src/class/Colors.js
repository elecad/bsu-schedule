class Colors {
  body = {
    "лаб.": "blue darken-2",
    "пр.з.": "green darken-2",
    "лек.": "purple darken-3",
    "зач.": "red darken-2",
    "экз.": "red darken-2",
    "пер.": "red darken-2",
    "конс.": "cyan darken-4",
  };

  text = {
    "лаб.": "white",
    "пр.з.": "white",
    "лек.": "white",
    "зач.": "white",
    "экз.": "white",
    "пер.": "white",
    "конс.": "white",
  };

  constructor() {}

  selectBodyColor(text) {
    const color = this.body[text] ? this.body[text] : "";

    return color;
  }

  selectTextColor(text) {
    const color = this.text[text] ? this.text[text] : "";
    return color;
  }
}

export default new Colors();
