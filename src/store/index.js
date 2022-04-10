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
    isSearch: false,
    currentDateAPI: new dateAPI(new Date()),
    buttonLabel: initDate.getLabel(),
    settings: {
      switchingToNextWeekOnSunday: false,
      theme: false,
    },
    hasLessonsToday: false,
  },
  getters: {
    isLoading(state) {
      return state.isLoading;
    },
    isSearch(state) {
      return state.isSearch;
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
    getHasLessonsToday(state) {
      return state.hasLessonsToday;
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

    CHANGE_SEARCH(state) {
      state.isSearch = !state.isSearch;
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
  },
  actions: {
    async loadGroup({ commit, state, dispatch }, { group }) {
      state.hasLessonsToday = false;
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

    async find_now_lesson({ commit, state, dispatch }) {
      const today = state.currentDateAPI.getTodayBsuAPI(new Date()); // сегодня в виже строки

      let findToday = false;

      // const now = new Date("04.08.2022 15:45");
      const now = new Date();

      console.log(now);
      let min = now.getTime() + 604800000; // Текущая дата + неделя

      let interval = 0;
      state.schedule.forEach((day) => {
        let validDate = day.date.split(".");
        [validDate[0], validDate[1]] = [validDate[1], validDate[0]];
        validDate = validDate.join(".");

        interval = new Date(validDate) - now.getTime();
        min = interval > 0 && interval < min ? interval : min;

        if (day.date == today) {
          day.today = true;
          findToday = true;
          day.lessons.forEach((lesson) => {
            const startDate = new Date(`${validDate} ${lesson.startTime}`);
            const endDate = new Date(`${validDate} ${lesson.endTime}`);

            interval = startDate.getTime() - now.getTime();
            min = interval > 0 && interval < min ? interval : min;
            interval = endDate.getTime() - now.getTime();
            min = interval > 0 && interval < min ? interval : min;

            lesson.isNow = startDate < now && now < endDate;
            lesson.isToday = true;
          });
        } else {
          day.today = false;
          day.lessons.forEach((lesson) => {
            lesson.isNow = false;
            lesson.isToday = false;
          });
        }

        //! Поиск задержки для следующего обновления
      });
      state.hasLessonsToday = findToday;
      console.log("min: ", min);
      if (min < 604800000) {
        // 7 суток
        console.log("Сработает: ", new Date(now.getTime() + min));
        setTimeout(() => {
          console.log("Обновление!");
          dispatch("find_now_lesson");
        }, min);
      }
    },
  },
  modules: {},
});
