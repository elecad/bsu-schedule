import Vue from "vue";
import Vuex from "vuex";

import parsers from "@/parser/parsers";
import dateAPI from "@/class/DateAPI";

let Parsers = new parsers();
let initDate = new dateAPI(new Date());

const dayRgb = [245, 245, 245];
const nightRgb = [39, 39, 39];
let night = 0;
let targetNight = night;
let rate = 2.5 / 60;

function smooth(x) {
  return x < 0.5 ? 2 * x ** 2 : 1 - 2 * (1 - x) ** 2;
}

// const themeColor = document.querySelector("meta[name=theme-color]");

function updateColour() {
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

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    header: null,
    schedule: null,
    isLoading: true,
    currentDateAPI: new dateAPI(new Date()),
    buttonLabel: initDate.getLabel(),
    settings: {
      switchingToNextWeekOnSunday: false,
      theme: false,
    },
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    getHeader(state) {
      return state.header;
    },
    getSchedule(state) {
      return state.schedule;
    },
    getLabel(state) {
      return state.buttonLabel;
    },
    getTheme(state) {
      return state.settings.theme;
    },
  },
  mutations: {
    SET_HEADER(state, header) {
      state.header = header;
    },
    SET_CONTENT(state, schedule) {
      state.schedule = schedule;
    },
    NEXT_WEEK(state) {
      state.currentDateAPI.goNextWeek();
      state.buttonLabel = state.currentDateAPI.getLabel();
    },
    BACK_WEEK(state) {
      state.currentDateAPI.goBackWeek();
      state.buttonLabel = state.currentDateAPI.getLabel();
    },
    NOW_WEEK(state) {
      state.currentDateAPI.resetDate();
      state.buttonLabel = state.currentDateAPI.getLabel();
    },
    END_LOADING(state) {
      state.isLoading = false;
    },
    START_LOADING(state) {
      state.isLoading = true;
    },
    INIT(state) {
      if (!localStorage.getItem("settings")) {
        localStorage.setItem("settings", JSON.stringify({ theme: false }));
      } else {
        state.settings.theme = JSON.parse(
          localStorage.getItem("settings")
        ).theme;
        if (state.settings.theme) {
          targetNight = 1 - targetNight;
          updateColour();
        }
      }
    },
    CHANGE_THEME(state) {
      state.settings.theme = !state.settings.theme;
      localStorage.setItem(
        "settings",
        JSON.stringify({ theme: state.settings.theme })
      );
      targetNight = 1 - targetNight;

      updateColour();
    },
    SET_TODAY(state, index) {
      state.schedule[index].today = true;
    },
  },
  actions: {
    async loadGroup({ commit, state, dispatch }, { group }) {
      try {
        commit("START_LOADING");

        const dateBsuFormat = state.currentDateAPI.getDateForBsuAPI();
        const groupData = await Parsers.fetchGroup({
          group: group,
          week: dateBsuFormat,
        });
        const header = groupData.data.header;
        const schedule = groupData.data.schedule;
        commit("SET_HEADER", header);
        commit("SET_CONTENT", schedule);
        commit("END_LOADING");
        dispatch("find_now_lesson");
      } catch (e) {
        console.log(e);
      }
    },

    async find_now_lesson({ commit, state }) {
      console.log(state);
      const today = state.currentDateAPI.getToday(new Date()); // сегодня
      state.schedule.forEach((day, index) => {
        if (day.date == today) {
          commit("SET_TODAY", index);
        }
        console.log(day);
      });
    },
  },
  modules: {},
});
