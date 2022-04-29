<template>
  <div>
    <v-scroll-y-transition leave-absolute>
      <div v-if="!loading && type" class="fix--position--schedule--body">
        <div v-for="(day, k) in body" :key="k">
          <day-header
            :week="day.dayWeek"
            :date="day.date"
            :today="day.today"
            :type="type"
          ></day-header>
          <v-expansion-panels flat accordion focusable class="d-block">
            <div class="mb-4" v-for="(lesson, i) in day.lessons" :key="i">
              <!--//! <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
                class="fix--transition"
              > -->
              <v-expansion-panel
                v-for="(sublesson, j) in lesson.content"
                :key="j"
              >
                <!-- //!Рендер занятий сегодня / текущего занятия -->
                <panel-header
                  @show--cupertiono--lesson="openMoreLessonPanel"
                  :lesson="lesson"
                  :sublesson="sublesson"
                  :last="lesson.content.length == j + 1"
                  :type="type"
                >
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
                ></panel-header>

                <panel-content
                  :more="sublesson"
                  :loading="loading"
                  :type="type"
                ></panel-content>
              </v-expansion-panel>
            </div>
          </v-expansion-panels>
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
      <app-scroll-button
        v-if="scrollButtonVisible"
        :hasCurrentButton="nowButton"
      ></app-scroll-button>
    </v-fab-transition>

    <div></div>
  </div>
</template>

<script>
import appCurrentButton from "@/components/desktop/FloatingButtons/AppCurrentButton.vue";
import appScrollButton from "@/components/desktop/FloatingButtons/AppScrollButton.vue";
import { debounce } from "@/plugins/debounce";
import dayHeader from "@/components/general/dayHeader.vue";
// import cardLesson from "@/components/mobile/Schedule/group/Body/cardLesson.vue";
// import moreLesson from "@/components/mobile/Schedule/group/Body/moreLesson.vue";
// import bottomSheet from "@/components/mobile/BottomSheet/BottomSheet.vue";
import notLesson from "@/components/general/NotLesson.vue";
import panelHeader from "@/components/desktop/Schedule/Body/PanelHeader.vue";
import panelContent from "@/components/desktop/Schedule/Body/PanelContent.vue";
import Colors from "@/class/Colors";

export default {
  name: "AppScheduleBodyDesktop",
  props: {
    loading: Boolean,
    body: Array,
    nowButton: Boolean,
    type: String,
  },
  components: {
    dayHeader,
    notLesson,
    panelHeader,
    panelContent,
    appCurrentButton,
    appScrollButton,
  },
  watch: {
    loading(newValue, oldValue) {
      console.log("Loading: ", newValue);
      if (newValue) {
        // this.selected = null;
        this.openMoreLesson = false;
      }
    },
  },
  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
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

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active >>> .v-icon,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--mousedown,
.v-expansion-panels:not(.theme--dark)
  .v-expansion-panel-header--mousedown
  .v-icon {
  color: #0c63e4 !important;
}

/* .v-expansion-panels:not(.theme--dark) >>> .v-chip {
  transition: 0.3s;
} */

.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header {
  transition: 0.3s min-height cubic-bezier(0.25, 0.8, 0.5, 1), 0.3s color !important;
}

/* .v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--active >>> .v-chip,
.v-expansion-panels:not(.theme--dark) .v-expansion-panel-header--mousedown >>>  .v-chip {
  opacity: 0.7 !important;
} */
</style>