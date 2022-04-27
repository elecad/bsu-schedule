class SystemUI {
  dayRgb = [245, 245, 245];
  nightRgb = [39, 39, 39];
  night = 0;
  targetNight = night;
  rate = 2.5 / 60;

  smooth(x) {
    return x < 0.5 ? 2 * x ** 2 : 1 - 2 * (1 - x) ** 2;
  }

  updateColour() {
    const colour = `rgb(${dayRgb.map(
      (day, i) => (nightRgb[i] - day) * smooth(night) + day
    )})`;
    themeColor.content = colour;
    document.body.style.backgroundColor = colour;
    if (night == targetNight) {
      return;
    }
    if (Math.abs(targetNight - night) < rate) {
      night = targetNight;
    } else {
      night += rate * (targetNight < night ? -1 : 1);
    }
    requestAnimationFrame(updateColour);
  }

  changeTheme() {
    targetNight = 1 - targetNight;
    updateColour();
  }

  constructor() {}
}
