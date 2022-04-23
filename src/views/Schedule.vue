<template>
  <div>
    <div class="navbar--mobile hidden-md-and-up">
      <nav-bar-mobile></nav-bar-mobile>
    </div>
    <div class="navigation--drawer--desktop hidden-sm-and-down">
      <nav-drawer-desktop></nav-drawer-desktop>
    </div>

    <v-main class="px-0">
      <v-container class="schedule--mobile hidden-md-and-up pa-2">
        <schedule-head
          class="mb-3"
          :header="header"
          :loading="isHeaderLoading"
          :dateISO="dateISO"
          @next--week="nextWeek"
          @back--week="backWeek"
          @date--week="dateWeek"
          :type="scheduleType"
        ></schedule-head>
        <schedule-body
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
        </schedule-body>
      </v-container>

      <v-container
        class="schedule--desktop hidden-sm-and-down pa-2"
      ></v-container>
    </v-main>

    <h3 class="hidden-sm-and-down">PC</h3>
    <h3 class="hidden-md-and-up">Mobile</h3>
    -->
  </div>
</template>

<script>
import navBarMobile from "@/components/mobile/NavBar/TheNavbarMobile.vue";
import navDrawerDesktop from "@/components/desktop/Drawer/Drawer.vue";

import scheduleHead from "@/components/mobile/Schedule/group/Header/TheHeaderSchedule.vue";
import scheduleBody from "@/components/mobile/Schedule/group/Body/TheBodySchedule.vue";
import scheduleFooter from "@/components/mobile/Footer/Footer.vue";
import dateAPI from "@/class/DateAPI";
import parsers from "@/parser/parsers";

export default {
  name: "ScheduleView",
  components: {
    navBarMobile,
    navDrawerDesktop,
    scheduleHead,
    scheduleBody,
    scheduleFooter,
  },
  data: () => ({
    dataAPI: new dateAPI(new Date(), true),
    header: null,
    body: null,
    isHeaderLoading: true,
    isBodyLoading: true,
    Parsers: new parsers(),
    nowButtonVisible: false,
    scheduleType: null,
    controller: new AbortController(),
  }),
  watch: {
    $route(to, from) {
      this.scheduleType = this.$router.currentRoute.name;
      this.INIT();
    },
  },
  computed: {
    dateISO() {
      return this.dataAPI.getDateISO();
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

    nextWeek() {
      this.dataAPI.goNextWeek();
      this.loading({ full: false });
      console.log("NEXT");
    },

    backWeek() {
      this.dataAPI.goBackWeek();
      this.loading({ full: false });
      console.log("BACK");
    },

    dateWeek(date) {
      console.log(date);
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

        let t = new Date();
        const dateBsuFormat = this.dataAPI.getDateForBsuAPI();
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

        if (+new Date() - t < 250) {
          await new Promise((resolve) => {
            setTimeout(() => resolve(), 250 - (+new Date() - t));
          });
        }

        if (full) {
          this.header = this.isGroup
            ? { name: groupData.data.header }
            : groupData.data.header;
        }
        this.body = null; //? Оптимизация
        this.scheduleType = this.$router.currentRoute.name;

        this.body = groupData.data.schedule;

        this.isHeaderLoading = false;
        this.isBodyLoading = false;

        this.findCurrentLesson();
        console.log("HEADER: ", groupData.data.header);
        console.log("BODY: ", groupData.data.schedule);
      } catch (e) {
        console.log(e);
      }
    },
    INIT() {
      this.loading();
    },
    findCurrentLesson() {
      const today = this.dataAPI.getTodayBsuAPI(new Date()); // сегодня строкой
      const now = new Date();

      let findToday = false;
      let min = now.getTime() + 604800000; // Текущая дата + неделя
      let interval = 0;
      this.body.forEach((day) => {
        let validDate = day.date.split(".");
        [validDate[0], validDate[1]] = [validDate[1], validDate[0]];
        validDate = validDate.join(".");

        interval = new Date(validDate) - now.getTime();
        min = interval > 0 && interval < min ? interval : min;

        if (day.date == today) {
          day.today = true;
          findToday = true;
          day.lessons.forEach((lesson) => {
            const startDate = new Date(`${validDate} ${lesson.startTime}`);
            const endDate = new Date(`${validDate} ${lesson.endTime}`);

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
      console.log("min: ", min);
      if (min < 604800000) {
        // 7 суток
        console.log("Сработает: ", new Date(now.getTime() + min));
        setTimeout(() => {
          console.log("Обновление!");
          this.findCurrentLesson();
        }, min);
      }
    },
  },
  created() {
    this.INIT();
  },
};
</script>

<style></style>
