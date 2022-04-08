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

          <v-expansion-panels accordion focusable class="d-block">
            <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
              <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
              >
                <v-expansion-panel-header class="padding--fix--expansion-panel">
                  <div class="today--lesson"></div>
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
                          <v-chip class="mr-1 mb-1" small>{{
                            sublesson.type
                          }}</v-chip>
                          <v-chip
                            class="mr-1 mb-1"
                            small
                            v-if="sublesson.subgroup"
                            >{{ sublesson.subgroup }}</v-chip
                          >
                          <v-chip
                            class="mr-1 mb-1"
                            small
                            v-if="sublesson.hasOnline"
                            >{{ sublesson.hasOnline }}</v-chip
                          >
                        </div>
                        <div
                          class="sublesson--discipline--name font-weight-medium my-3"
                          v-html="sublesson.name"
                        ></div>
                        <div
                          class="sublesson--discipline--teacher mt-2 text-caption"
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
                <v-expansion-panel-content>
                  <div class="content">
                    <div>
                      <div
                        class="sublesson--discipline--information--teacher mp-2 text-caption"
                      >
                        <v-icon class="my-1">mdi-information-variant</v-icon>
                        {{ sublesson.teacher.promt }}
                      </div>
                      <div
                        class="sublesson--discipline--information--location text-caption"
                        v-if="sublesson.location.aud != ''"
                      >
                        <v-icon class="my-1">mdi-information-variant</v-icon>
                        {{ sublesson.location.prompt }}
                      </div>
                      <v-row justify="end" class="mt-2">
                        <v-btn
                          depressed
                          color="primary"
                          v-for="(link, i) in sublesson.links"
                          :key="i"
                          class="ma-2"
                          :href="link.href"
                          target="_blank"
                        >
                          {{ link.name }}
                        </v-btn>
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
  </div>
</template>

<script>
import parsers from "@/parser/parsers";
import Intersect from "vue-intersect";

const Parsers = new parsers();
export default {
  name: "AppScheduleContentMobile",
  components: { Intersect },
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
  },
  data: () => ({
    lessons: null,
    now: "04.04.2022 14:40",
  }),
  computed: {
    stateSchedule() {
      return this.$store.getters.getSchedule;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
    nowDay(_) {
      const start = new Date("04.04.2022 14:00");
      const end = new Date("04.04.2022 15:35");

      return start < new Date(this.now) && new Date(this.now) < end;
    },
    nowLesson() {
      const start = new Date("04.04.2022 14:00");
      const end = new Date("04.04.2022 15:35");

      return start < new Date(this.now) && new Date(this.now) < end;
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
  z-index: 10;
}
.fix--position--day--card.active-fly {
  border-top-left-radius: 0px !important;
  border-top-right-radius: 0px !important;
}

@media (max-width: 317px) {
  .fix--day--name {
    font-size: 1.05rem !important;
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

.padding--fix--expansion-panel {
  padding: 16px !important;
}

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active .v-icon,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active .v-chip,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--mousedown,
.v-expansion-panels:not(.theme--dark)
  .v-expansion-panel-header--mousedown
  .v-icon,
.v-expansion-panels:not(.theme--dark)
  .v-expansion-panel-header--mousedown
  .v-chip {
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

/* .now--lesson {
  border-inline-start: 3px solid #3f51b5;
} */
.now--lesson {
  position: absolute;
  height: 100%;
  left: 0;
  border-inline-start: 3px solid #3f51b5;
}

.today--lesson {
  position: absolute;
  height: 100%;
  left: 0;
  border-inline-start: 3px solid rgba(63, 63, 63, 0.404);
}

.now--day {
  color: white;
  position: absolute;
  top: 12px;
  left: 15px;
}
</style>
