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

    <v-main>
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
import navBarMobile from "@/components/mobile/NavBar/TheNavbarMobile.vue";
import navDrawerDesktop from "@/components/desktop/Drawer/Drawer.vue";
import scheduleHeadMobile from "@/components/mobile/Schedule/group/Header/TheHeaderSchedule.vue";
import scheduleBodyMobile from "@/components/mobile/Schedule/group/Body/TheBodySchedule.vue";
import scheduleFooter from "@/components/mobile/Footer/Footer.vue";
import dateAPI from "@/class/DateAPI";
import parsers from "@/parser/parsers";
import scheduleHeaderDesktop from "@/components/desktop/Schedule/Header/TheSheduleHeader.vue";
import scheduleBodyDesktop from "@/components/desktop/Schedule/Body/TheSheduleBody.vue";

export default {
  name: "ScheduleView",
  components: {
    navBarMobile,
    navDrawerDesktop,
    scheduleHeadMobile,
    scheduleBodyMobile,
    scheduleFooter,
    scheduleHeaderDesktop,
    scheduleBodyDesktop,
  },
  data: () => ({
    dateAPI: new dateAPI(new Date(), true),
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
  }),
  watch: {
    $route(to, from) {
      this.scrollUp();
      this.scheduleType = this.$router.currentRoute.name;
      this.INIT();
    },
  },
  computed: {
    dateISO() {
      return this.dateAPI.getDateISO();
    },
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
    validate() {
      return (
        this.$route.params.id.length == 8 &&
        Number.isInteger(Number(this.$route.params.id))
      );
    },

    onResize() {
      if (window.innerWidth > 959) {
        console.log("ПК ВЕРСИЯ!");
        this.isMobile = false;
      } else {
        console.log("МОБИЛЬНАЯ ВЕРСИЯ ВЕРСИЯ!");
        this.isMobile = true;
      }
    },

    nextWeek() {
      this.dateAPI.goNextWeek();
      this.scrollUp();
      this.loading({ full: false });
      console.log("NEXT");
    },

    backWeek() {
      this.dateAPI.goBackWeek();
      this.scrollUp();
      this.loading({ full: false });
      console.log("BACK");
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
      this.loading();
    },
    findCurrentLesson() {
      clearTimeout(this.updateTimer);

      let re = /(\d+)\.(\d+)\.(\d+)/;

      let today = new Date();
      today = [
        today.getFullYear(),
        ("0" + (today.getMonth() + 1)).slice(-2),
        ("0" + today.getDate()).slice(-2),
      ].join("-");

      // const today = this.dateAPI.getTodayBsuAPI(new Date()).replace; // сегодня строкой
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

      if (findToday) {
        // 7 суток
        console.log("Сработает: ", new Date(now.getTime() + min));

        this.updateTimer = setTimeout(() => {
          console.log("Обновление!");
          this.findCurrentLesson();
        }, min);
      }
    },
  },
  created() {
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

<style scoped>
.fix--width--schedule--desktop {
  width: 100%;
  max-width: 1000px;
}
</style>
