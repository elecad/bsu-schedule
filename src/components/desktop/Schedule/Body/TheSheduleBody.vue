<template>
  <div>
    <v-scroll-y-transition leave-absolute>
      <div v-if="!loading && type">
        <div v-for="(day, k) in body" :key="k">
          <day-header
            :week="day.dayWeek"
            :date="day.date"
            :today="day.today"
            :type="type"
          ></day-header>
          <v-expansion-panels flat accordion focusable class="d-block">
            <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
              <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
                class="fix--transition"
              >
                <v-expansion-panel-header class="padding--fix--expansion-panel">
                  <!-- //!Рендер занятий сегодня / текущего занятия -->
                  <panel-header
                    @show--cupertiono--lesson="openMoreLessonPanel"
                    :lesson="lesson"
                    :sublesson="sublesson"
                    :last="lesson.content.length == j + 1"
                    :type="type"
                  >
                    <div
                      class="now--lesson"
                      v-if="lesson.isNow"
                      ref="nowLesson"
                    ></div>
                    <div
                      class="today--lesson"
                      v-else-if="lesson.isToday"
                      ref="todayLesson"
                    ></div
                  ></panel-header>

                  <!-- <div class="d-flex">
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
                  </div> -->
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
        <slot></slot>
      </div>
    </v-scroll-y-transition>

    <v-scroll-y-transition leave-absolute>
      <div v-if="body">
        <not-lesson v-if="body.length == 0"></not-lesson>
      </div>
    </v-scroll-y-transition>

    <div
      v-if="loading || !type"
      class="d-flex align-center justify-center mt-15"
    >
      <v-progress-circular indeterminate color="indigo"></v-progress-circular>
    </div>

    <!-- <v-fab-transition>
      <app-current-button
        v-if="nowButton"
        @scroll--now--day="scrollNowDay"
      ></app-current-button>
    </v-fab-transition>

    <v-fab-transition>
      <app-scroll-button v-if="scrollButtonVisible"></app-scroll-button>
    </v-fab-transition> -->
  </div>
</template>

<script>
// import appCurrentButton from "@/components/mobile/FloatingButtons/AppCurrentButton.vue";
// import appScrollButton from "@/components/mobile/FloatingButtons/AppScrollButton.vue";
import { debounce } from "@/plugins/debounce";
import dayHeader from "@/components/general/dayHeader.vue";
// import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
// import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";
// import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";
import notLesson from "@/components/NotLesson/NotLesson.vue";
import panelHeader from "@/components/desktop/Schedule/Body/PanelHeader.vue";
import Colors from "@/class/Colors";

export default {
  name: "AppScheduleBodyDesktop",
  props: {
    loading: Boolean,
    body: Array,
    nowButton: Boolean,
    type: String,
  },
  components: {
    dayHeader,
    notLesson,
    panelHeader,
  },
  watch: {
    loading(newValue, oldValue) {
      console.log("Loading: ", newValue);
      if (newValue) {
        // this.selected = null;
        this.openMoreLesson = false;
      }
    },
  },
  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
    scrollNowDay() {
      let scrollLesson = document.querySelector(".now--lesson");
      let type = "now";
      if (scrollLesson == null) {
        scrollLesson = document.querySelector(".today--lesson");
        type = "today";
      }
      this.scroll(scrollLesson, type);
    },

    openMoreLessonPanel(sublesson, isNow) {
      this.selected = {
        type: this.$router.currentRoute.name,
        isNow,
        sublesson,
      };
      this.openMoreLesson = this.openMoreLesson ? false : true;
    },
    scroll(DOMElement, type) {
      const elementPosition = DOMElement.getBoundingClientRect().top;
      const topOffset = type == "now" ? 60 : 65;
      const offsetPosition = elementPosition - topOffset;
      console.log(elementPosition);
      window.scrollBy({
        top: offsetPosition,
        behavior: "smooth",
      });
    },
  },
  data: () => ({
    selected: null,
    openMoreLesson: false,
    scrollButtonVisible: false,
    nowLessonSelected: false,
    previousTop: 0,
    tooltipSubgroupShow: false,
  }),
  computed: {},

  created() {},
  mounted() {
    this.handleDebouncedScroll = debounce(() => {
      if (this.previousTop - window.scrollY < -20) {
        // console.log("user scroll to bottom");
        this.scrollButtonVisible = false;
      } else if (window.scrollY < 200) {
        this.scrollButtonVisible = false;
      } else if (this.previousTop - window.scrollY > 20) {
        // console.log("user scroll to top");
        this.scrollButtonVisible = true;
      }
      this.previousTop = window.scrollY;
    }, 20);
    window.addEventListener("scroll", this.handleDebouncedScroll);
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleDebouncedScroll);
  },
};
</script>

<style>
@media (max-width: 319px) {
  .fix--font--size--course--buttons {
    font-size: 0.7rem !important;
  }
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

.fix--transition {
  transition: none !important;
}
</style>
