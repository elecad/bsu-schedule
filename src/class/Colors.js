class Colors {
  body = {
    "лаб.": "blue darken-2",
    "пр.з.": "green darken-2",
    "лек.": "purple darken-3",
    "зач.": "red darken-2",
    "экз.": "red darken-2",
    "пер.": "red darken-2",
    "конс.": "red darken-4",
    "курс.р.": "red darken-4",
    "дифф.зач.": "red darken-4",
    "ТЕСТ": "red darken-4",
    "пер.": "red darken-2",
    "ком.": "red darken-2",
  };

  text = {};

  constructor() {}

  selectBodyColor(text) {
    const color = this.body[text] ? this.body[text] : "";

    return color;
  }

  selectTextColor(text) {
    const color = this.text[text] ? this.text[text] : "white";
    return color;
  }
}

export default new Colors();
