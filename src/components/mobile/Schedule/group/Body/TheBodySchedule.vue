<template>
  <div>
    <v-scroll-y-transition>
      <div v-if="!loading && type">
        <div v-for="(day, k) in body" :key="k">
          <day-header
            :week="day.dayWeek"
            :date="day.date"
            :today="day.today"
            :type="type"
          ></day-header>
          <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
            <div
              v-for="(sublesson, j) in lesson.content"
              :key="j"
              class="fix--transition"
            >
              <card-lesson
                @show--cupertiono--lesson="openMoreLessonPanel"
                class="elevation-2"
                :lesson="lesson"
                :sublesson="sublesson"
                :last="lesson.content.length == j + 1"
                :type="type"
              >
                <!-- //!Рендер занятий сегодня / текущего занятия -->
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
              ></card-lesson>
            </div>
          </div>
        </div>
      </div>
    </v-scroll-y-transition>

    <div
      v-if="loading || !type"
      class="d-flex align-center justify-center mt-15"
    >
      <v-progress-circular indeterminate color="indigo"></v-progress-circular>
    </div>

    <v-fab-transition>
      <app-current-button
        v-if="nowButton"
        @scroll--now--day="scrollNowDay"
      ></app-current-button>
    </v-fab-transition>

    <v-fab-transition>
      <app-scroll-button v-if="scrollButtonVisible"></app-scroll-button>
    </v-fab-transition>

    <bottom-sheet
      v-model="openMoreLesson"
      :id="'lesson--bottom--sheet'"
      :isNow="nowLessonSelected"
    >
      <more-lesson
        :sublesson="selected"
        :isNow="nowLessonSelected"
        :type="type"
      ></more-lesson>
    </bottom-sheet>
  </div>
</template>

<script>
import appCurrentButton from "@/components/mobile/FloatingButtons/AppCurrentButton.vue";
import appScrollButton from "@/components/mobile/FloatingButtons/AppScrollButton.vue";
import { debounce } from "@/plugins/debounce";
import dayHeader from "@/components/mobile/Schedule/group/Body/dayHeader.vue";
import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";
import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";

export default {
  name: "AppScheduleContentMobile",
  props: {
    loading: Boolean,
    body: Array,
    nowButton: Boolean,
    type: String,
  },
  components: {
    moreLesson,
    cardLesson,
    appCurrentButton,
    dayHeader,
    bottomSheet,
    appScrollButton,
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

    openMoreLessonPanel(sublesson, isNow) {
      this.selected = sublesson;
      this.nowLessonSelected = isNow;
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
