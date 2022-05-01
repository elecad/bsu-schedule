class SystemUI {
  dayRgb = [245, 245, 245];
  nightRgb = [39, 39, 39];
  bottomSheetRgb = [147, 147, 147];
  night = 0;
  targetNight = this.night;
  rate = 2.5 / 60;

  smooth(x) {
    return x < 0.5 ? 2 * x ** 2 : 1 - 2 * (1 - x) ** 2;
  }

  updateColour = () => {
    const colour = `rgb(${this.dayRgb.map(
      (day, i) => (this.nightRgb[i] - day) * this.smooth(this.night) + day
    )})`;
    themeColor.content = colour;
    document.body.style.backgroundColor = colour;
    if (this.night == this.targetNight) {
      return;
    }
    if (Math.abs(this.targetNight - this.night) < this.rate) {
      this.night = this.targetNight;
    } else {
      this.night += this.rate * (this.targetNight < this.night ? -1 : 1);
    }
    requestAnimationFrame(this.updateColour);
  };

  changeThemeAppBar() {
    this.targetNight = 1 - this.targetNight;
    this.updateColour();
  }

  overlayOnTheme(delay) {
    setTimeout(() => {
      const colour = `rgb(${this.bottomSheetRgb[0]},${this.bottomSheetRgb[1]},${this.bottomSheetRgb[2]})`;
      themeColor.content = colour;
    }, delay);
  }

  overlayOffTheme(delay) {
    setTimeout(() => {
      const colour = `rgb(${this.dayRgb[0]},${this.dayRgb[1]},${this.dayRgb[2]})`;
      themeColor.content = colour;
    }, delay);
  }

  constructor() {}
}

export default new SystemUI();
