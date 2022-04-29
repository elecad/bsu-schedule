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
  },
  mutations: {
    INIT(state) {
      state.last = LSAPI.last;
      state.favorite = LSAPI.favorite;
    },

    SET_LAST(state, { type, id }) {
      if (state.last.type != type && state.last.id != id) {
        LSAPI.last = { type, id };
        state.last = { type, id };
      }
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
  },
  actions: {},
  modules: {},
});
