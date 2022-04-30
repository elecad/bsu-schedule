class SystemUI {
  dayRgb = [245, 245, 245];
  nightRgb = [39, 39, 39];
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

  constructor() {}
}

export default new SystemUI();
