<template>
  <v-expansion-panel-header class="padding--fix--expansion-panel">
    <slot></slot>

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
        <div class="ml-3 mr-3">
          <!-- //! Характеристики занятия -->
          <div class="sublesson--discipline--type">
            <v-chip
              class="mr-1 mb-1"
              small
              :color="selectColorsBodyChip(sublesson.type)"
              :text-color="selectColorsTextChip(sublesson.type)"
              v-if="sublesson.type"
              >{{ sublesson.type }}</v-chip
            >

            <v-chip
              class="mr-1 mb-1"
              small
              color="teal darken-2"
              text-color="white"
              v-if="sublesson.subgroup"
            >
              <span>{{ sublesson.subgroup }} </span></v-chip
            >

            <v-chip
              class="mr-1 mb-1"
              small
              v-if="sublesson.online && !sublesson.location.aud"
              color="indigo"
              text-color="white"
            >
              онлайн</v-chip
            >
            <v-chip
              class="mr-1 mb-1"
              small
              v-if="sublesson.online && sublesson.location.aud"
              color="indigo"
              text-color="white"
            >
              с возм. онлайн</v-chip
            >
          </div>

          <!-- //! Наименование занятия -->

          <div class="sublesson--discipline--name font-weight-medium my-3">
            {{ sublesson.name }}

            <small class="text--disabled" v-if="sublesson.subname"
              >{{ sublesson.subname }}
            </small>
            <v-icon
              dense
              class="ml-3 copy--icon"
              @click.stop="copyValue($event, sublesson.name, 'discipline')"
              >{{ copyDiscipline ? "mdi-check" : "mdi-content-copy" }}</v-icon
            >
          </div>

          <!-- //! Группа -->
          <div v-if="!isGroup">
            <div
              class="sublesson--discipline--group text-caption"
              v-if="sublesson.group.id"
            >
              <div class="mr-1">
                <v-icon>mdi-account-supervisor</v-icon>
              </div>
              <div class="">{{ sublesson.group.name }}</div>
            </div>
          </div>

          <!-- //! Преподаватель занятия -->

          <div v-if="!isTeacher">
            <div
              class="sublesson--discipline--teacher text-caption"
              v-if="sublesson.teacher.surname"
            >
              <div class="mr-1">
                <v-icon>mdi-account</v-icon>
              </div>
              <div>
                {{
                  `${sublesson.teacher.surname} ${sublesson.teacher.name} ${sublesson.teacher.middlename} (${sublesson.teacher.post})`
                }}
                <v-icon
                  dense
                  class="ml-3 copy--icon"
                  @click.stop="
                    copyValue(
                      $event,
                      `${sublesson.teacher.post} ${sublesson.teacher.surname} ${sublesson.teacher.name} ${sublesson.teacher.middlename}`,
                      'teacher'
                    )
                  "
                  >{{ copyTeacher ? "mdi-check" : "mdi-content-copy" }}</v-icon
                >
              </div>
            </div>
          </div>

          <!-- //! Место проведения занятия -->
          <div v-if="!isLocation">
            <div
              class="sublesson--discipline--location text-caption"
              v-if="sublesson.location.aud || sublesson.location.specific"
            >
              <div class="mr-1">
                <v-icon>mdi-map-marker</v-icon>
              </div>
              <div>
                {{
                  sublesson.location.aud
                    ? `ауд. ${sublesson.location.aud} ${sublesson.location.corp}`
                    : sublesson.location.specific
                }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </v-expansion-panel-header>
</template>

<script>
import Colors from "@/class/Colors";
export default {
  name: "PanelHeader",
  props: {
    lesson: Object,
    sublesson: Object,
    last: Boolean,
    type: String,
  },
  computed: {
    hasMoreInfo() {
      switch (this.$router.currentRoute.name) {
        case "group":
          return !(
            this.sublesson.teacher.id == false &&
            this.sublesson.location.id == false &&
            this.sublesson.links.length == false
          );

        case "teacher":
          return !(
            this.sublesson.group.id == false &&
            this.sublesson.location.id == false &&
            this.sublesson.links.length == false
          );
        case "location":
          return !(
            this.sublesson.group.id == false &&
            this.sublesson.teacher.id == false &&
            this.sublesson.links.length == false
          );
      }
    },
    isGroup() {
      return this.type == "group";
    },

    isLocation() {
      return this.type == "location";
    },

    isTeacher() {
      return this.type == "teacher";
    },
  },
  data: () => ({
    copyDiscipline: false,
    copyTeacher: false,
  }),

  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
    openCupertiono(_, sublesson) {
      if (this.hasMoreInfo) {
        this.$emit("show--cupertiono--lesson", sublesson, this.lesson.isNow);
      }
    },
    copyValue($event, value, type) {
      if (!navigator.clipboard) {
        return;
      }
      navigator.clipboard
        .writeText(value)
        .then(() => {
          if (type == "discipline") {
            this.copyDiscipline = true;
          } else {
            this.copyTeacher = true;
          }
          setTimeout(() => {
            this.copyDiscipline = false;
            this.copyTeacher = false;
          }, 1000);
        })
        .catch((err) => {
          console.error(`Ошибка копирования: ${err}`);
        });
    },
  },
};
</script>

<style scoped>
.padding--fix--expansion-panel {
  padding: 16px !important;
}

.v-expansion-panel-header .sublesson--discipline--teacher,
.v-expansion-panel-header .sublesson--discipline--location,
.v-expansion-panel-header
  .v-expansion-panel-header.sublesson--discipline--group {
  font-size: 0.8rem !important;
}

.v-expansion-panel-header .sublesson--discipline--name {
  font-size: 1rem !important;
}
.copy--icon {
  position: absolute;
  opacity: 0;
  transition: 0.5s;
  transition-property: opacity;
}

.sublesson--discipline--name:hover >>> .v-icon {
  opacity: 1;
}

.sublesson--discipline--teacher:hover >>> .v-icon {
  opacity: 1;
}
</style>

<style>
.tooltip--text {
  font-size: 0.7rem !important;
}
</style>
