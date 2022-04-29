const LAST_NAME = "last";
const FAVORITE_NAME = "favorite";
const SETTINGS_NAME = "settings";
const WELCOME_TYPE_NAME = "welcome";

const DEFAULT_LAST = {
  type: WELCOME_TYPE_NAME,
};
const DEFAULT_FAVORITE = [];
const DEFAULT_SETTINGS = {
  dark: false,
  autoNextWeek: true,
  weakDesktop: false,
  weakMobile: false,
};

class LocalStorageAPI {
  LS = null;

  constructor() {
    this.LS = localStorage;

    if (this.check) {
      localStorage.setItem(LAST_NAME, JSON.stringify(DEFAULT_LAST));
      localStorage.setItem(FAVORITE_NAME, JSON.stringify(DEFAULT_FAVORITE));
      localStorage.setItem(SETTINGS_NAME, JSON.stringify(DEFAULT_SETTINGS));
    }
  }

  _setLastDefault() {
    localStorage.setItem(LAST_NAME, JSON.stringify(DEFAULT_LAST));
  }

  _setFavoriteDefault() {
    localStorage.setItem(FAVORITE_NAME, JSON.stringify(DEFAULT_FAVORITE));
  }

  _setSettingsDefault() {
    localStorage.setItem(SETTINGS_NAME, JSON.stringify(DEFAULT_SETTINGS));
  }

  get last() {
    try {
      const data = JSON.parse(this.LS.last);
      let result = null;
      if (data.type && data.id) {
        result = {
          type: data.type,
          id: data.id,
        };
      } else {
        result = DEFAULT_LAST;
      }
      return result;
    } catch (e) {
      this._setLastDefault();
      return DEFAULT_LAST;
    }
  }

  set last(value) {
    localStorage.setItem(LAST_NAME, JSON.stringify(value));
  }

  get favorite() {
    try {
      const data = JSON.parse(this.LS.favorite);
      let result = [];
      if (Array.isArray(data)) {
        result = data.filter((fav) => {
          return (
            fav.hasOwnProperty("id") &&
            fav.hasOwnProperty("label") &&
            fav.hasOwnProperty("type")
          );
        });
      }
      return result;
    } catch (e) {
      this._setFavoriteDefault();
      return DEFAULT_FAVORITE;
    }
  }

  set favorite(value) {
    localStorage.setItem(FAVORITE_NAME, JSON.stringify(value));
  }

  get settings() {
    try {
      const data = JSON.parse(this.LS.settings);
      return {
        dark:
          "dark" in data && typeof data.dark == "boolean"
            ? data.dark
            : DEFAULT_SETTINGS.dark,
        autoNextWeek:
          "autoNextWeek" in data && typeof data.autoNextWeek == "boolean"
            ? data.autoNextWeek
            : DEFAULT_SETTINGS.autoNextWeek,
        weakDesktop:
          "weakDesktop" in data && typeof data.weakDesktop == "boolean"
            ? data.weakDesktop
            : DEFAULT_SETTINGS.weakDesktop,
        weakMobile:
          "weakMobile" in data && typeof data.weakMobile == "boolean"
            ? data.weakMobile
            : DEFAULT_SETTINGS.weakMobile,
      };
    } catch (e) {
      this._setSettingsDefault();
      return DEFAULT_SETTINGS;
    }
  }

  set settings(value) {
    localStorage.setItem(SETTINGS_NAME, JSON.stringify(value));
  }

  get check() {
    return this.LS.length < 3;
  }
}

export default new LocalStorageAPI();
