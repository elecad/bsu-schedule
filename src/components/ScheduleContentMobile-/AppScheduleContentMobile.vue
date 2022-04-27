<template>
  <div>
    <v-scroll-y-transition>
      <div v-if="!isLoading">
        <div v-for="(day, i) in stateSchedule" :key="i">
          <intersect
            @enter="enterDay($event)"
            @leave="leaveDay($event)"
            :threshold="[1]"
          >
            <v-card
              class="mb-3 elevation-2 fix--position--day--card"
              color="indigo"
            >
              <div class="now--day" v-if="day.today">●</div>
              <v-card-title class="py-1">
                <v-card-title class="white--text py-1 fix--day--name">{{
                  day.dayWeek
                }}</v-card-title>
                <v-spacer></v-spacer>
                <v-card-subtitle class="white--text py-1">{{
                  day.date
                }}</v-card-subtitle></v-card-title
              >
            </v-card>
          </intersect>

          <v-expansion-panels flat accordion focusable class="d-block">
            <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
              <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
                class="fix--transition"
              >
                <v-expansion-panel-header class="padding--fix--expansion-panel">
                  <!-- //!Рендер занятий сегодня / текущего занятия -->
                  <div
                    class="now--lesson"
                    v-if="lesson.isNow"
                    ref="nowLesson"
                  ></div>
                  <div
                    class="today--lesson"
                    v-else-if="lesson.isToday"
                    ref="todayLesson"
                  ></div>

                  <div class="d-flex">
                    <div class="lesson d-flex">
                      <div
                        class="d-flex flex-column align-center justify-center mr-3"
                      >
                        <div class="sublesson--start--time">
                          {{ lesson.startTime }}
                        </div>
                        <div
                          class="sublesson--number text-h4 font-weight-medium my-3"
                        >
                          {{ lesson.number }}
                        </div>
                        <div class="sublesson--end--time">
                          {{ lesson.endTime }}
                        </div>
                      </div>
                      <v-divider vertical></v-divider>
                      <div class="ml-3">
                        <div class="sublesson--discipline--type">
                          <v-chip
                            class="mr-1 mb-1 elevation-1"
                            small
                            :color="selectColorsBodyChip(sublesson.type)"
                            :text-color="selectColorsTextChip(sublesson.type)"
                            >{{ sublesson.type }}</v-chip
                          >
                          <v-chip
                            class="mr-1 mb-1 elevation-1"
                            small
                            color="teal darken-2"
                            text-color="white"
                            v-if="sublesson.subgroup"
                            >{{ sublesson.subgroup }}</v-chip
                          >
                          <v-chip
                            class="mr-1 mb-1 elevation-1"
                            small
                            v-if="sublesson.online"
                            color="indigo"
                            text-color="white"
                          >
                            онлайн</v-chip
                          >
                        </div>
                        <div
                          class="sublesson--discipline--name font-weight-medium my-3"
                        >
                          {{ sublesson.name }}
                          <small
                            class="text--disabled"
                            v-if="sublesson.subname"
                            >{{ sublesson.subname }}</small
                          >
                        </div>
                        <div
                          class="sublesson--discipline--teacher mt-2 text-caption"
                          v-if="sublesson.teacher.surname"
                        >
                          <div class="mr-1">
                            <v-icon>mdi-account</v-icon>
                          </div>
                          <div>
                            {{
                              `${sublesson.teacher.surname} ${sublesson.teacher.name} ${sublesson.teacher.middlename} (${sublesson.teacher.post})`
                            }}
                          </div>
                        </div>
                        <div
                          class="sublesson--discipline--location text-caption"
                          v-if="
                            sublesson.location.aud ||
                            sublesson.location.specific
                          "
                        >
                          <v-icon class="mr-1">mdi-office-building</v-icon
                          >{{
                            sublesson.location.aud
                              ? `ауд. ${sublesson.location.aud} ${sublesson.location.corp}`
                              : sublesson.location.specific
                          }}
                        </div>
                      </div>
                    </div>
                  </div>
                </v-expansion-panel-header>

                <v-expansion-panel-content class="fix--transition">
                  <div class="content">
                    <div>
                      <div class="px-5">
                        <div
                          class="sublesson--discipline--information--teacher my-2 text-caption"
                          v-if="sublesson.teacher.surname"
                        >
                          <v-icon class="my-1"
                            >mdi-account-question-outline</v-icon
                          >
                          {{ sublesson.teacher.promt }}
                        </div>
                        <div
                          class="sublesson--discipline--information--location text-caption"
                          v-if="
                            (sublesson.location.aud ||
                              sublesson.location.specific) &&
                            !sublesson.online
                          "
                        >
                          <v-icon class="my-1"
                            >mdi-map-marker-question-outline</v-icon
                          >
                          {{ sublesson.location.prompt }}
                        </div>
                      </div>

                      <v-row align="center" justify="center" no-gutters dense>
                        <v-col cols="2" sm="1" v-if="sublesson.teacher.surname">
                          <v-btn fab dark small color="indigo">
                            <v-icon dark> mdi-account </v-icon>
                          </v-btn></v-col
                        >
                        <v-col cols="2" sm="1"
                          ><v-btn
                            fab
                            dark
                            small
                            color="indigo"
                            v-if="sublesson.location.aud"
                          >
                            <v-icon> mdi-office-building </v-icon>
                          </v-btn></v-col
                        >
                        <v-spacer></v-spacer>
                        <v-row no-gutters dense justify="end">
                          <v-col class="d-flex justify-end">
                            <div class="d-flex flex-column">
                              <v-btn
                                v-for="(link, i) in sublesson.links"
                                :key="i"
                                depressed
                                color="indigo"
                                dark
                                class="fix--font--size--course--buttons ma-2"
                                :href="link.href"
                                target="_blank"
                              >
                                {{ link.name }}
                              </v-btn>
                            </div>
                          </v-col>
                        </v-row>
                      </v-row>
                    </div>
                  </div>
                </v-expansion-panel-content>
              </v-expansion-panel>
            </div>
          </v-expansion-panels>
        </div>
      </div>
    </v-scroll-y-transition>

    <div v-if="isLoading" class="d-flex align-center justify-center mt-15">
      <v-progress-circular indeterminate color="indigo"></v-progress-circular>
    </div>

    <v-fab-transition>
      <app-floating-button
        @scroll--now--day="scrollNowDay"
        v-if="showFloatingButton"
      ></app-floating-button>
    </v-fab-transition>
  </div>
</template>

<script>
import parsers from "@/parser/parsers";
import Intersect from "vue-intersect";
import appFloatingButton from "@/components/ScheduleContentMobile-/AppFloatingButton.vue";
import Colors from "@/class/Colors";

const Parsers = new parsers();
export default {
  name: "AppScheduleContentMobile",
  components: { Intersect, appFloatingButton },
  methods: {
    enterDay(event) {
      if (event[0].intersectionRatio) {
        event[0].target.classList.remove("active-fly");
      }
    },
    leaveDay(event) {
      if (event[0].intersectionRatio) {
        event[0].target.classList.add("active-fly");
      }
    },
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
    scrollNowDay() {
      // console.log(this.$refs);
      if (this.$refs.nowLesson) {
        //? Мотаем до текущей пары
        this.scroll(this.$refs.nowLesson[0], "now");
      } else if (this.$refs.todayLesson) {
        //? Мотаем до сегодняшней пары
        // console.log("До сегодняшней!", this.$refs.todayLesson);
        this.scroll(this.$refs.todayLesson[0], "today");
      }
    },

    scroll(DOMElement, type) {
      const elementPosition = DOMElement.getBoundingClientRect().top;
      const topOffset = type == "now" ? 60 : 65;
      const offsetPosition = elementPosition - topOffset;
      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
  },
  data: () => ({}),
  computed: {
    stateSchedule() {
      return this.$store.getters.getSchedule;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    showFloatingButton() {
      return (
        this.$store.getters.getHasLessonsToday && !this.$store.getters.isSearch
      );
    },
  },

  created() {
    this.$store.dispatch("loadGroup", {
      group: "12001902",
      operation: "current",
    });
  },
};
</script>

<style>
.fix--position--day--card {
  position: sticky !important;
  top: -1px;
  z-index: 6;
}
.fix--position--day--card.active-fly {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

@media (max-width: 317px) {
  .fix--day--name {
    font-size: 1.05rem !important;
  }
  .fix--font--size--course--buttons {
    font-size: 0.7rem !important;
  }
}

@media (max-width: 350px) {
  .fix--font--size--course--buttons {
    font-size: 0.8rem !important;
  }
}

.sublesson--discipline--teacher {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--teacher > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--teacher > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--teacher > div:nth-child(2) {
  margin-top: 1px;
}

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active .v-icon,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--mousedown,
.v-expansion-panels:not(.theme--dark)
  .v-expansion-panel-header--mousedown
  .v-icon {
  color: #0c63e4 !important;
}

.v-expansion-panels:not(.theme--dark) .v-chip {
  transition: 0.3s;
}

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header {
  transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1), 0.3s color !important;
}

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active .v-chip,
.v-expansion-panels:not(.theme--dark)
  .v-expansion-panel-header--mousedown
  .v-chip {
  background-color: #e7f1ff;
}

.now--lesson {
  position: absolute;
  height: 100%;
  left: 0;
  border-inline-start: 4px solid #3f51b5;
}

.today--lesson {
  position: absolute;
  height: 100%;
  left: 0;
  border-inline-start: 4px solid rgba(134, 134, 134, 0.404);
}

.now--day {
  color: white;
  position: absolute;
  top: 12px;
  left: 15px;
}

.fix--transition {
  transition: none !important;
}
/* .v-expansion-panel-content__wrap {
  padding: 0 !important;
} */
</style>
