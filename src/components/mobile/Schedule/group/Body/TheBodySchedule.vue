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
                @show--cupertiono--lesson="openCupertino"
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

    <bottom-sheet v-model="openCupertionoLesson" :id="'lesson--bottom--sheet'">
      <more-lesson :sublesson="selected"></more-lesson>
    </bottom-sheet>
  </div>
</template>

<script>
import appFloatingButton from "@/components/ScheduleContentMobile/AppFloatingButton.vue";
import dayHeader from "@/components/mobile/Schedule/group/Body/dayHeader.vue";
import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";
import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";

export default {
  name: "AppScheduleContentMobile",
  props: {
    loading: Boolean,
    body: Array,
  },
  components: {
    moreLesson,
    cardLesson,
    appFloatingButton,
    dayHeader,
    bottomSheet,
  },
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
    openCupertino(sublesson) {
      this.selected = sublesson;

      this.openCupertionoLesson = true;
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
    swipe(say) {
      console.log(say);
      // alert("123");
    },
    test($event) {
      console.log("START Y", $event.touchstartY);
      console.log("CURRENT Y", $event.touchmoveY);
      const start = $event.touchstartY;
      const end = $event.touchmoveY;

      if (start - end < 0) {
        console.log("Уменьшить на ", start - end);
      }
    },
    downSwipe($event) {
      this.openCupertionoLesson = false;
    },
  },
  data: () => ({
    selected: null,
    openCupertionoLesson: false,
    hight: 300,
  }),
  computed: {},

  created() {},
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
