<template>
  <v-expansion-panels flat accordion focusable class="d-block">
    <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
      <v-expansion-panel
        v-for="(sublesson, j) in lesson.content"
        :key="j"
        class="fix--transition"
      >
        <v-expansion-panel-header class="padding--fix--expansion-panel">
          <div class="now--lesson" v-if="lesson.isNow" ref="nowLesson"></div>
          <div
            class="today--lesson"
            v-else-if="lesson.isToday"
            ref="todayLesson"
          ></div>

          <div class="d-flex">
            <div class="lesson d-flex">
              <div class="d-flex flex-column align-center justify-center mr-3">
                <div class="sublesson--start--time">
                  {{ lesson.startTime }}
                </div>
                <div class="sublesson--number text-h4 font-weight-medium my-3">
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
                  <small class="text--disabled" v-if="sublesson.subname">{{
                    sublesson.subname
                  }}</small>
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
                  v-if="sublesson.location.aud || sublesson.location.specific"
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
                  <v-icon class="my-1">mdi-account-question-outline</v-icon>
                  {{ sublesson.teacher.promt }}
                </div>
                <div
                  class="sublesson--discipline--information--location text-caption"
                  v-if="
                    (sublesson.location.aud || sublesson.location.specific) &&
                    !sublesson.online
                  "
                >
                  <v-icon class="my-1">mdi-map-marker-question-outline</v-icon>
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
</template>

<script>
export default {};
</script>

<style></style>
