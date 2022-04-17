<template>
  <div>
    <v-scroll-y-transition>
      <div v-if="!loading">
        <div v-for="(day, k) in body" :key="k">
          <day-header
            :week="day.dayWeek"
            :date="day.date"
            :today="day.today"
          ></day-header>
          <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
            <div
              v-for="(sublesson, j) in lesson.content"
              :key="j"
              class="fix--transition"
            >
              <card-lesson
                @show--cupertiono--lesson="test"
                class="elevation-2"
                :lesson="lesson"
                :sublesson="sublesson"
                :last="lesson.content.length == j + 1"
              ></card-lesson>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-y-transition>

    <div v-if="loading" class="d-flex align-center justify-center mt-15">
      <v-progress-circular indeterminate color="indigo"></v-progress-circular>
    </div>

    <v-fab-transition>
      <app-floating-button
        @scroll--now--day="scrollNowDay"
        v-if="true"
      ></app-floating-button>
    </v-fab-transition>

    <more-lesson ref="favorite-mobile" :sublesson="selected"></more-lesson>
  </div>
</template>

<script>
import appFloatingButton from "@/components/ScheduleContentMobile/AppFloatingButton.vue";
import dayHeader from "@/components/mobile/Schedule/group/Body/dayHeader.vue";
import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";

export default {
  name: "AppScheduleContentMobile",
  props: {
    loading: Boolean,
    body: Array,
  },
  components: { moreLesson, cardLesson, appFloatingButton, dayHeader },
  methods: {
    scrollNowDay() {
      if (this.$refs.nowLesson) {
        //? Мотаем до текущей пары
        this.scroll(this.$refs.nowLesson[0], "now");
      } else if (this.$refs.todayLesson) {
        //? Мотаем до сегодняшней пары
        this.scroll(this.$refs.todayLesson[0], "today");
      }
    },
    test(sublesson) {
      console.log(sublesson);
      this.selected = sublesson;
      this.$refs["favorite-mobile"].showCupertino();
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
  data: () => ({
    selected: null,
  }),
  computed: {},

  created() {},
};
</script>

<style>
@media (max-width: 350px) {
  .fix--font--size--course--buttons {
    font-size: 0.7rem !important;
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
