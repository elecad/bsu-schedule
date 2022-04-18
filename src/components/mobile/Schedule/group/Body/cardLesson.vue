<template>
  <div>
    <v-card
      class="fix--border--radius--card"
      elevation="0"
      @click.native="openCupertiono($event, sublesson)"
    >
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
          <div class="ml-3 mr-2">
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
            <div class="sublesson--discipline--name font-weight-medium my-3">
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
      <v-icon v-show="hasMoreInfo" class="fix--position--more--icon"
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
  },
  computed: {
    hasMoreInfo() {
      return !(
        this.sublesson.teacher.id == false &&
        this.sublesson.location.id == false &&
        this.sublesson.links.length == false
      );
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
        this.$emit("show--cupertiono--lesson", sublesson);
      }
    },
  },
};
</script>

<style>
.fix--border--radius--card {
  border-radius: 0px !important;
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
</style>
