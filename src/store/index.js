import Vue from "vue";
import Vuex from "vuex";
import LSAPI from "@/class/LocalStorageAPI.js";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    last: {},
    favorite: [],
    settings: {},
  },
  getters: {
    getLast(state) {
      return state.last;
    },
    getFavorite(state) {
      return state.favorite;
    },
    getSettings(state) {
      return state.settings;
    },
  },
  mutations: {
    INIT(state) {
      state.last = LSAPI.last;
      state.favorite = LSAPI.favorite;
      state.settings = LSAPI.settings;
    },

    SET_LAST(state, { type, id }) {
      if (state.last.type == type && state.last.id == id) return;

      LSAPI.last = { type, id };
      state.last = { type, id };
    },

    ADD_FAVORITE(state, { type, id, label }) {
      if (type && id && label) {
        state.favorite.push({ type, id, label });
        LSAPI.favorite = state.favorite;
      }
    },

    REMOVE_FAVORITE(state, { type, id }) {
      if (type && id) {
        state.favorite = state.favorite.filter((fav) => {
          return !(fav.id == id && fav.type == type);
        });
        LSAPI.favorite = state.favorite;
      }
    },

    dark(state, value) {
      state.settings.dark = value;
      LSAPI.settings = state.settings;
    },

    autoNextWeek(state, value) {
      state.settings.autoNextWeek = value;
      LSAPI.settings = state.settings;
    },
    weakDesktop(state, value) {
      state.settings.weakDesktop = value;
      LSAPI.settings = state.settings;
    },
    weakMobile(state, value) {
      state.settings.weakMobile = value;
      LSAPI.settings = state.settings;
    },
  },
  actions: {},
  modules: {},
});
