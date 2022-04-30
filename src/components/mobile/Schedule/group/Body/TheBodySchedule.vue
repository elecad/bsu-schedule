<template>
  <div>
    <v-scroll-y-transition leave-absolute>
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
        <slot></slot>
      </div>
    </v-scroll-y-transition>

    <v-scroll-y-transition leave-absolute>
      <div v-if="body">
        <not-lesson v-if="body.length == 0"></not-lesson>
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
        :more="selected"
        :loading="loading"
        @open--snakbar--subgroup="tooltipSubgroupShow = !tooltipSubgroupShow"
      ></more-lesson>
    </bottom-sheet>

    <v-snackbar v-model="tooltipSubgroupShow" timeout="2000">
      <div class="d-flex align-center justify-center">
        <div v-if="selected">{{ selected.sublesson.subgroup }}</div>
      </div>
    </v-snackbar>
  </div>
</template>

<script>
import appCurrentButton from "@/components/mobile/FloatingButtons/AppCurrentButton.vue";
import appScrollButton from "@/components/mobile/FloatingButtons/AppScrollButton.vue";
import { debounce } from "@/plugins/debounce";
import dayHeader from "@/components/general/dayHeader.vue";
import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";
import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";
import notLesson from "@/components/general/NotLesson.vue";

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
    notLesson,
  },
  watch: {
    loading(newValue, oldValue) {
      if (newValue) {
        this.openMoreLesson = false;
      }
    },
  },
  methods: {
    scrollNowDay() {
      let scrollLesson = document.querySelector(".now--lesson");
      let type = "now";
      if (scrollLesson == null) {
        scrollLesson = document.querySelector(".today--lesson");
        type = "today";
      }
      this.scroll(scrollLesson, type);
    },

    openMoreLessonPanel(sublesson, isNow) {
      this.selected = {
        type: this.$router.currentRoute.name,
        isNow,
        sublesson,
      };
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
    tooltipSubgroupShow: false,
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

<style scoped>
@media (max-width: 319px) {
  .fix--font--size--course--buttons {
    font-size: 0.7rem !important;
  }
}
</style>
