<template>
  <div v-resize="onResize">
    <div v-if="isMobile" class="navbar--mobile">
      <nav-bar-mobile></nav-bar-mobile>
    </div>

    <div v-if="!isMobile" class="navigation--drawer--desktop">
      <nav-drawer-desktop
        :dateAPI="dateAPI"
        @next--week="nextWeek"
        @back--week="backWeek"
        @date--week="dateWeek"
      ></nav-drawer-desktop>
    </div>

    <v-main :style="{ paddingLeft: isMobile ? '0px' : '400px' }">
      <v-container v-if="isMobile" class="schedule--mobile pa-2">
        <schedule-head-mobile
          :header="header"
          :loading="isHeaderLoading"
          :dateAPI="dateAPI"
          @next--week="nextWeek"
          @back--week="backWeek"
          @date--week="dateWeek"
          :type="scheduleType"
          class="mb-3"
        ></schedule-head-mobile>

        <schedule-body-mobile
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
        <scheduleHeaderDesktop
          :header="header"
          :loading="isHeaderLoading"
          :autoChange="dateAPI ? dateAPI.autoNextWeek : false"
          @next--week="nextWeek"
          @back--week="backWeek"
          @date--week="dateWeek"
          :type="scheduleType"
          class="mb-3"
        ></scheduleHeaderDesktop>
        <scheduleBodyDesktop
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
        ></scheduleBodyDesktop>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import dateAPI from "@/class/DateAPI";
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
    dateAPI: null,
    header: null,
    body: null,
    isHeaderLoading: true,
    isBodyLoading: true,
    Parsers: new parsers(),
    nowButtonVisible: false,
    scheduleType: null,
    controller: new AbortController(),
    isMobile: window.innerWidth > 959 ? false : true,
    updateTimer: null,
    autoChangeWeek: false,
  }),
  watch: {
    $route(to, from) {
      this.scrollUp();
      this.scheduleType = this.$router.currentRoute.name;
      this.INIT();
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
    onResize() {
      if (window.innerWidth > 959) {
        this.isMobile = false;
      } else {
        this.isMobile = true;
      }
    },

    nextWeek() {
      this.dateAPI.goNextWeek();
      this.scrollUp();
      this.loading({ full: false });
    },

    backWeek() {
      this.dateAPI.goBackWeek();
      this.scrollUp();
      this.loading({ full: false });
    },

    dateWeek(date) {
      this.dateAPI.setDate(new Date(date));
      this.scrollUp();
      this.loading({ full: false });
    },

    scrollUp() {
      window.scrollTo({ top: 0, behavior: "auto" });
    },

    async loading({ full } = { full: true }) {
      try {
        this.controller.abort();
        this.controller = new AbortController();
        this.scheduleType = this.$router.currentRoute.name;
        if (full) {
          this.isHeaderLoading = true;
          this.header = null;
        }

        this.isBodyLoading = true;
        this.body = null;

        const dateBsuFormat = this.dateAPI.getDateForBsuAPI();
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
        }

        if (!groupData.validate) {
          this.$router.push({ name: "notFound" });
          return;
        }
        this.$store.commit("SET_LAST", {
          type: this.$router.currentRoute.name,
          id: this.$route.params.id,
        });
        if (full) {
          this.header = this.isGroup
            ? { name: groupData.data.header }
            : groupData.data.header;
        }

        this.scheduleType = this.$router.currentRoute.name;

        this.body = groupData.data.schedule;

        this.isHeaderLoading = false;
        this.isBodyLoading = false;

        this.findCurrentLesson();
      } catch (e) {
        console.log(e);
      }
    },
    INIT() {
      (this.dateAPI = new dateAPI(
        new Date(),
        this.$store.getters.getSettings.autoNextWeek
      )),
        this.loading();
    },
    findCurrentLesson() {
      if (!this.body) return;
      if (this.updateTimer) clearTimeout(this.updateTimer);

      let re = /(\d+)\.(\d+)\.(\d+)/;

      let today = new Date();
      today = [
        today.getFullYear(),
        ("0" + (today.getMonth() + 1)).slice(-2),
        ("0" + today.getDate()).slice(-2),
      ].join("-");

      const now = new Date();

      let findToday = false;
      let min = now.getTime() + 604800000; // Текущая дата + неделя
      let interval = 0;

      this.body.forEach((day) => {
        let validDate = day.date.replace(re, "$3-$2-$1");

        interval = new Date(validDate) - now.getTime();
        min = interval > 0 && interval < min ? interval : min;

        if (validDate == today) {
          day.today = true;
          findToday = true;
          day.lessons.forEach((lesson) => {
            const startDate = new Date(`${validDate}T${lesson.startTime}`);
            const endDate = new Date(`${validDate}T${lesson.endTime}`);

            interval = startDate.getTime() - now.getTime();
            min = interval > 0 && interval < min ? interval : min;
            interval = endDate.getTime() - now.getTime();
            min = interval > 0 && interval < min ? interval : min;

            lesson.isNow = startDate < now && now < endDate;

            lesson.isToday = true;
          });
        } else {
          day.today = false;
          day.lessons.forEach((lesson) => {
            lesson.isNow = false;
            lesson.isToday = false;
          });
        }

        //! Поиск задержки для следующего обновления
      });

      this.nowButtonVisible = findToday;

      if (findToday && min < 604800000) {
        // 7 суток
        console.log("Сработает: ", new Date(now.getTime() + min));

        this.updateTimer = setTimeout(() => {
          console.log("Обновление!");
          this.findCurrentLesson();
        }, min);
      }
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
  border-inline-start: 4px solid rgba(134, 134, 134, 0.404);
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
</style>
