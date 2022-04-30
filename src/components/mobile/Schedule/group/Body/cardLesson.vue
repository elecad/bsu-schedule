<template>
  <div>
    <v-card
      class="fix--border--radius--card transition--card"
      :class="{
        'hover--card--light': isHover && !isDark,
        'hover--card--dark': isHover && isDark,
      }"
      elevation="0"
      @click.native="openCupertiono($event, sublesson)"
    >
      <slot></slot>

      <div class="d-flex pa-4">
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
                class="mr-1 mb-1 elevation-1"
                small
                :color="selectColorsBodyChip(sublesson.type)"
                :text-color="selectColorsTextChip(sublesson.type)"
                v-if="sublesson.type"
                >{{ sublesson.type }}</v-chip
              >

              <v-chip
                class="mr-1 mb-1 elevation-1"
                small
                color="teal darken-2"
                text-color="white"
                v-if="sublesson.subgroup"
              >
                <span class="fix--width--chip--subgrpup"
                  >{{ sublesson.subgroup }}
                </span></v-chip
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

            <!-- //! Наименование занятия -->
            <div class="sublesson--discipline--name font-weight-medium my-3">
              {{ sublesson.name }}
              <small class="text--disabled" v-if="sublesson.subname">{{
                sublesson.subname
              }}</small>
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
      <v-icon
        v-show="hasMoreInfo"
        class="fix--position--more--icon"
        :class="{ 'icon--transition': isHover }"
        >mdi-chevron-right</v-icon
      >
    </v-card>
    <v-divider v-if="!last" class="fix--opasity--divider"></v-divider>
  </div>
</template>

<script>
import Colors from "@/class/Colors";

export default {
  name: "cardLesson",
  props: {
    lesson: Object,
    sublesson: Object,
    last: Boolean,
    type: String,
  },
  data: () => ({
    isHover: false,
    duration: 500,
  }),
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
          break;
        case "location":
          return !(
            this.sublesson.group.id == false &&
            this.sublesson.teacher.id == false &&
            this.sublesson.links.length == false
          );
          break;
      }
    },
    isDark() {
      return this.$store.getters.getSettings.dark;
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
  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
    openCupertiono(_, sublesson) {
      if (this.hasMoreInfo) {
        this.isHover = true;
        setTimeout(() => {
          this.isHover = false;
        }, this.duration);
        this.$emit("show--cupertiono--lesson", sublesson, this.lesson.isNow);
      }
    },
  },
};
</script>

<style scoped>
.fix--border--radius--card {
  border-radius: 0px !important;
}

.fix--width--chip--subgrpup {
  max-width: 86px !important;
  text-overflow: ellipsis !important;
  overflow: hidden !important;
}
.fix--opasity--divider {
  opacity: 0.2 !important;
}
.sublesson--discipline--name {
  line-height: 1;
}

.v-card:before {
  display: none;
}

.fix--position--more--icon {
  position: absolute !important;
  top: calc(50% - 12px);
  right: 7px;
}

* >>> .hover--card--light {
  background-color: #e2edfc !important;
  color: #0c63e4 !important;
}

.hover--card--light >>> .v-icon {
  color: #0c63e4 !important;
}

* >>> .hover--card--dark {
  background-color: #3d3d3d !important;
}

.transition--card {
  transition: 0.2s;
  transition-property: background-color, color;
}

.icon--transition {
  right: 3px;
}
</style>
