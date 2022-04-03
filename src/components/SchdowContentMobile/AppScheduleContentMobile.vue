<template>
  <div>
    <v-scroll-y-transition>
      <div v-if="!isLoading">
        <div v-for="(day, i) in stateSchedule" :key="i">
          <v-card class="mb-3 elevation-5" color="indigo">
            <v-card-title class="py-1">
              <v-card-title class="white--text py-1">{{
                day.dayWeek
              }}</v-card-title>
              <v-spacer></v-spacer>
              <v-card-subtitle class="white--text py-1">{{
                day.date
              }}</v-card-subtitle></v-card-title
            >
          </v-card>

          <v-expansion-panels accordion focusable class="d-block">
            <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
              <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
              >
                <v-expansion-panel-header class="padding--fix--expansion-panel">
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

const Parsers = new parsers();
export default {
  name: "AppScheduleContentMobile",
  data: () => ({
    lessons: null,
    loading: true,
  }),
  computed: {
    stateSchedule() {
      return this.$store.getters.getSchedule;
    },
    isLoading() {
      return this.$store.getters.isLoading;
    },
  },

  async mounted() {},

  created() {
    this.$store.dispatch("loadGroup", {
      group: "12001902",
      operation: "current",
    });
  },
};
</script>

<style>
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
</style>
