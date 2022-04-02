<template>
  <div v-if="!loading">
    <v-card v-for="(day, i) in lessons.data.shedule" :key="i" class="mb-3">
      <v-card-title>{{ day.dayWeek }}</v-card-title>
      <v-card-subtitle>{{ day.date }}</v-card-subtitle>
      <v-divider></v-divider>
      <v-card-text>
        <v-expansion-panels accordion focusable>
          <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
            <v-expansion-panel
              v-for="(sublesson, j) in lesson.content"
              :key="j"
            >
              <v-expansion-panel-header>
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

                    <div>
                      <div class="sublesson--discipline--type">
                        <v-chip small>{{ sublesson.type }}</v-chip>
                      </div>
                      <div
                        class="sublesson--discipline--name font-weight-medium my-3"
                      >
                        {{ sublesson.name }}
                      </div>
                      <div
                        class="sublesson--discipline--teacher my-2 text-caption"
                      >
                        <v-icon class="my-1">mdi-account</v-icon>
                        {{
                          `${sublesson.teacher.post} ${sublesson.teacher.surname} ${sublesson.teacher.name} ${sublesson.teacher.middlename}`
                        }}
                      </div>
                      <div class="sublesson--discipline--location text-caption">
                        <v-icon class="my-1">mdi-office-building</v-icon>
                        {{
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
                      class="sublesson--discipline--information--teacher mp-2"
                    >
                      <v-icon class="my-1">mdi-information-variant</v-icon>
                      {{ sublesson.teacher.promt }}
                    </div>
                    <div
                      class="sublesson--discipline--information--location"
                      v-if="sublesson.location.aud != ''"
                    >
                      <v-icon class="my-1">mdi-information-variant</v-icon>
                      {{ sublesson.location.corp }}
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
      </v-card-text>
    </v-card>
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

  async mounted() {
    const groupData = await Parsers.fetchGroup({
      group: "12001902",
      week: "2803202203042022",
    });
    console.log(groupData);
    console.log(groupData.data.shedule[1].lessons);
    this.lessons = groupData;
    this.loading = false;
  },
};
</script>

<style></style>
