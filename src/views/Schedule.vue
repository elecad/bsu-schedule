<template>
  <div v-resize="onResize">
    <div v-if="isMobile" class="navbar--mobile">
      <nav-bar-mobile></nav-bar-mobile>
    </div>

    <div v-if="!isMobile" class="navigation--drawer--desktop">
      <nav-drawer-desktop
        :dateRange="dateRange"
        :dateRangeLabel="dateRangeLabel"
        @update:dateRange="onDateRangeUpdate"
        @date--set="onDateRangeSet"
      ></nav-drawer-desktop>
    </div>

    <v-main :style="{ paddingLeft: isMobile ? '0px' : '400px' }">
      <v-container v-if="isMobile" class="schedule--mobile pa-2">
        <schedule-head-mobile
          :header="header"
          :loading="isHeaderLoading"
          :dateRange="dateRange"
          :dateRangeLabel="dateRangeLabel"
          :autoNextWeek="autoNextWeek"
          @update:dateRange="onDateRangeUpdate"
          @next--week="nextWeek"
          @back--week="backWeek"
          @date--set="onDateRangeSet"
          :type="scheduleType"
          class="mb-3"
        ></schedule-head-mobile>

        <schedule-body-mobile
          :hasError="hasError"
          :loading="isBodyLoading"
          :body="body"
          :nowButton="nowButtonVisible"
          :type="scheduleType"
        >
          <div v-if="body">
            <schedule-footer
              :loading="isBodyLoading"
              v-if="body.length != 0"
            ></schedule-footer>
          </div>
        </schedule-body-mobile>
      </v-container>

      <v-container
        v-if="!isMobile"
        class="schedule--desktop pa-2 fix--width--schedule--desktop"
      >
        <schedule-header-desktop
          :header="header"
          :loading="isHeaderLoading"
          :autoChange="autoNextWeek"
          @next--week="nextWeek"
          @back--week="backWeek"
          @update:dateRange="onDateRangeUpdate"
          @date--set="onDateRangeSet"
          :type="scheduleType"
          class="mb-3"
        ></schedule-header-desktop>
        <schedule-body-desktop
          :hasError="hasError"
          :loading="isBodyLoading"
          :body="body"
          :nowButton="nowButtonVisible"
          :type="scheduleType"
        >
          <div v-if="body">
            <schedule-footer
              :loading="isBodyLoading"
              v-if="body.length != 0"
            ></schedule-footer></div
        ></schedule-body-desktop>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import parsers from "@/parser/parsers";

export default {
  name: "ScheduleView",
  components: {
    "nav-bar-mobile": () =>
      import("@/components/mobile/NavBar/TheNavbarMobile.vue"),
    "nav-drawer-desktop": () =>
      import("@/components/desktop/Drawer/Drawer.vue"),
    "schedule-head-mobile": () =>
      import("@/components/mobile/Schedule/group/Header/TheHeaderSchedule.vue"),
    "schedule-body-mobile": () =>
      import("@/components/mobile/Schedule/group/Body/TheBodySchedule.vue"),
    "schedule-footer": () => import("@/components/mobile/Footer/Footer.vue"),
    "scheduleHeaderDesktop": () =>
      import("@/components/desktop/Schedule/Header/TheSheduleHeader.vue"),
    "scheduleBodyDesktop": () =>
      import("@/components/desktop/Schedule/Body/TheSheduleBody.vue"),
    "scheduleBodyDesktop": () =>
      import("@/components/desktop/Schedule/Body/TheSheduleBody.vue"),
  },
  data: () => ({
    header: null,
    body: null,
    isHeaderLoading: true,
    isBodyLoading: true,
    Parsers: new parsers(),
    nowButtonVisible: false,
    scheduleType: null,
    controller: new AbortController(),
    isMobile: window.innerWidth > 959 ? false : true,
    autoChangeWeek: false,
    hasError: false,

    d: new Date(),
    timeFrom: null,
    timeTo: null,
    autoNextWeek: false,
    dateRange: [],
    dateRangePrev: [],
    dateRangeLabel: "-",

    nextUpdate: 0,
    nextUpdateTimer: null,
  }),
  watch: {
    $route(to, from) {
      this.scrollUp();
      this.scheduleType = this.$router.currentRoute.name;
      // this.INIT();

      this.calcDateRange();
      this.loading({ full: true });
    },
  },
  computed: {
    isGroup() {
      return this.scheduleType == "group";
    },

    isLocation() {
      return this.scheduleType == "location";
    },

    isTeacher() {
      return this.scheduleType == "teacher";
    },
  },
  methods: {
    onDateRangeUpdate(dateRange) {
      this.d.setTime(Date.parse(dateRange[0]));
      this.calcDateRange();
    },
    onDateRangeSet() {
      this.autoNextWeek = false;

      if (
        !this.dateRangePrev.length ||
        this.dateRangePrev[0] != this.dateRange[0] ||
        this.dateRangePrev[1] != this.dateRange[1]
      ) {
        this.loading({ full: this.hasError });
      }
    },
    onResize() {
      if (window.innerWidth > 959) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    },

    nextWeek() {
      this.autoNextWeek = false;

      this.d.setTime(this.timeTo);
      this.d.setDate(this.d.getDate() + 1);
      this.calcDateRange();

      this.scrollUp();

      this.loading({ full: this.hasError });
    },

    backWeek() {
      this.autoNextWeek = false;

      this.d.setTime(this.timeFrom);
      this.d.setDate(this.d.getDate() - 1);
      this.calcDateRange();

      this.scrollUp();

      this.loading({ full: this.hasError });
    },

    scrollUp() {
      window.scrollTo({ top: 0, behavior: "auto" });
    },

    async loading({ full } = { full: true }) {
      try {
        this.controller.abort();
        this.controller = new AbortController();
        this.scheduleType = this.$router.currentRoute.name;
        this.hasError = false;

        if (full) {
          this.isHeaderLoading = true;
          this.header = null;
          this.nextUpdate = 0;
        }

        this.isBodyLoading = true;
        this.body = null;

        let re = /(\d+)-(\d+)-(\d+)/;
        const dateBsuFormat =
          this.dateRange[0].replace(re, "$3$2$1") +
          this.dateRange[1].replace(re, "$3$2$1");
        this.dateRangePrev = this.dateRange;

        let groupData = {};
        switch (this.scheduleType) {
          case "group":
            this.type = "group";
            groupData = await this.Parsers.fetchGroup({
              group: this.$route.params.id,
              week: dateBsuFormat,
              signal: this.controller.signal,
            });
            break;
          case "teacher":
            this.type = "teacher";
            groupData = await this.Parsers.fetchTeacher({
              teacher: this.$route.params.id,
              week: dateBsuFormat,
              signal: this.controller.signal,
            });
            break;
          case "location":
            this.type = "location";
            groupData = await this.Parsers.fetchLocation({
              location: this.$route.params.id,
              week: dateBsuFormat,
              signal: this.controller.signal,
            });
            break;
          case "welcome":
            this.type = "welcome";
            return;
        }

        if (!groupData.validate) {
          this.$router.push({ name: "notFound" });
          return;
        }

        this.$store.commit("SET_LAST", {
          type: this.$router.currentRoute.name,
          id: this.$route.params.id,
        });

        this.header = this.isGroup
          ? { name: groupData.data.header }
          : groupData.data.header;

        this.scheduleType = this.$router.currentRoute.name;

        this.body = groupData.data.schedule;

        this.isHeaderLoading = false;
        this.isBodyLoading = false;

        this.findCurrentLesson();
      } catch (e) {
        if (e && e.name == "AbortError") {
          return;
        }

        if (
          this.$router.currentRoute.name == "group" &&
          this.$route.params.id.length < 8
        ) {
          this.$router.push({ name: "notFound" });
          return;
        }

        this.hasError = true;
        this.isHeaderLoading = true;
        this.isBodyLoading = false;
      }
    },
    calcDateRange() {
      let currentDay = this.d.getDay();

      if (currentDay == 0) {
        currentDay = 7;
      }

      const monthNames = [
        "Янв",
        "Фев",
        "Мар",
        "Апр",
        "Мая",
        "Июн",
        "Июл",
        "Авг",
        "Сен",
        "Окт",
        "Ноя",
        "Дек",
      ];

      let dr = [];

      this.dateRangeLabel = "";

      // monday
      this.d.setDate(this.d.getDate() + (1 - currentDay));
      this.timeFrom = this.d.setHours(0, 0, 0);
      this.dateRangeLabel =
        this.d.getDate() + " " + monthNames[this.d.getMonth()];
      dr[0] = this.d.toLocaleDateString("en-CA"); // Canadian locale matches ISO format (YYYY-mm-dd)

      this.dateRangeLabel += " - ";

      // sunday
      this.d.setDate(this.d.getDate() + 6);
      this.timeTo = this.d.setHours(23, 59, 59);
      this.dateRangeLabel +=
        this.d.getDate() + " " + monthNames[this.d.getMonth()];
      dr[1] = this.d.toLocaleDateString("en-CA");

      this.dateRange = dr;
    },
    INIT() {
      if (this.$route.name != "welcome") {
        if (
          this.$store.getters.getSettings.autoNextWeek &&
          this.d.getDay() == 0
        ) {
          this.d.setDate(this.d.getDate() + 1);
          this.autoNextWeek = true;
        }

        this.calcDateRange();
        this.loading({ full: true });
      } else {
        this.scheduleType = "welcome";
      }
    },
    findCurrentLesson() {
      let now = Date.now();

      if (now < this.timeFrom || now > this.timeTo) {
        if (this.nextUpdate) {
          this.nextUpdate = 0;
          this.nowButtonVisible = false;

          clearTimeout(this.nextUpdateTimer);
          this.nextUpdateTimer = null;

          if (this.body) {
            for (let day of this.body) {
              for (let lesson of day.lessons) {
                lesson.isNow = false;
                lesson.isToday = false;
              }
            }
          }
        }

        return;
      }

      if (this.nextUpdateTimer) {
        clearTimeout(this.nextUpdateTimer);

        if (now < this.nextUpdate) {
          setTimeout(() => {
            this.findCurrentLesson();
          }, this.nextUpdate - now);

          return;
        }
      }

      if (this.nextUpdate) {
        this.d.setTime(this.nextUpdate);

        if (this.d.getHours() == 0) {
          this.dateRange = [...this.dateRange]; // trigger watch on datepickers
        }
      }

      if (!this.body) {
        return;
      }

      let re = /(\d+)\.(\d+)\.(\d+)/;

      this.nowButtonVisible = false;
      this.nextUpdate = 0;

      this.d.setTime(now);
      let todayTime = this.d.setHours(0, 0, 0, 0);
      let dayTime, lf, lt, m;

      for (let day of this.body) {
        dayTime = Date.parse(day.date.replace(re, "$3-$2-$1T00:00:00"));

        if (dayTime == todayTime) {
          day.today = true;
          this.nowButtonVisible = true;

          for (let lesson of day.lessons) {
            m = lesson.startTime.split(":");
            lf = dayTime + m[0] * 3600000 + m[1] * 60000;

            m = lesson.endTime.split(":");
            lt = dayTime + m[0] * 3600000 + m[1] * 60000;

            if (!this.nextUpdate) {
              if (lf > now) {
                this.nextUpdate = lf;
              } else if (lt > now) {
                this.nextUpdate = lt;
              }
            }

            lesson.isToday = true;
            lesson.isNow = now >= lf && now <= lt;
          }
        } else {
          day.today = false;

          for (let lesson of day.lessons) {
            lesson.isNow = false;
            lesson.isToday = false;
          }
        }
      }

      if (now > this.nextUpdate) {
        this.nextUpdate = todayTime + 86400000; // next day ?
      }

      this.nextUpdateTimer = setTimeout(() => {
        this.findCurrentLesson();
      }, this.nextUpdate - now);
    },
  },
  mounted() {
    this.INIT();

    document.addEventListener("visibilitychange", (event) => {
      if (
        document.visibilityState == "visible" &&
        this.body &&
        this.body.length
      ) {
        this.findCurrentLesson();
      }
    });
  },
};
</script>

<style>
.fix--width--schedule--desktop {
  width: 100%;
  max-width: 1000px;
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

  border-inline-start: 4px solid rgba(63, 81, 181, 0.4);
}

.sublesson--discipline--information--location {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--information--location > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--information--location > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--information--location > div:nth-child(2) {
  margin-top: 1px;
}

.sublesson--discipline--information--teacher {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--information--teacher > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--information--teacher > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--information--teacher > div:nth-child(2) {
  margin-top: 1px;
}

.sublesson--discipline--information--group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--information--group > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--information--group > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--information--group > div:nth-child(2) {
  margin-top: 1px;
}

.sublesson--discipline--location {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--location > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--location > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--location > div:nth-child(2) {
  margin-top: 1px;
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

.sublesson--discipline--group {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--group > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--group > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--group > div:nth-child(2) {
  margin-top: 1px;
}

.sublesson--discipline--location {
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;
  align-items: flex-start;
}
.sublesson--discipline--location > div:first-child {
  display: flex;
  justify-content: center;
  align-items: center;
}
.sublesson--discipline--location > div:first-child:before {
  content: "A";
  width: 0px;
  visibility: hidden;
}

.sublesson--discipline--location > div:nth-child(2) {
  margin-top: 1px;
}

.fix--transition {
  transition: none !important;
}

.v-btn::before {
  display: none;
}
</style>
