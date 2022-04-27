const LAST_NAME = "last";
const FAVORITE_NAME = "favorite";
const SETTINGS_NAME = "settings";
const WELCOME_TYPE_NAME = "welcome";

const DEFAULT_LAST = {};
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
    console.log(this.check);
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
        result = {
          type: WELCOME_TYPE_NAME,
        };
      }
      return result;
    } catch (e) {
      this._setLastDefault();
      return {
        type: WELCOME_TYPE_NAME,
      };
    }
  }

  set last(value) {
    localStorage.setItem(LAST_NAME, JSON.stringify(value));
  }

  get favorite() {
    try {
      const data = JSON.parse(this.LS.favorite);
      let result = [];
      if (data.isArray) {
        result = data.filter((fav) => {
          fav.id && fav.label && fav.type;
        });
      }
      return result;
    } catch (e) {
      this._setFavoriteDefault();
      return [];
    }
  }

  set favorite(value) {
    localStorage.setItem(FAVORITE_NAME, JSON.stringify(value));
  }

  get check() {
    return this.LS.length < 3;
  }
}

export default new LocalStorageAPI();
