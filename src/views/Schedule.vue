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
      <div v-if="isMobile" class="schedule--mobile">
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
      </div>

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
import { createLogger } from "vuex";

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
    controller: null,
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
      this.loading({ full: true }).then();
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
        this.loading({ full: this.hasError }).then();
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

      this.loading({ full: this.hasError }).then();
    },

    backWeek() {
      this.autoNextWeek = false;

      this.d.setTime(this.timeFrom);
      this.d.setDate(this.d.getDate() - 1);
      this.calcDateRange();

      this.scrollUp();

      this.loading({ full: this.hasError }).then();
    },

    scrollUp() {
      window.scrollTo({ top: 0, behavior: "auto" });
    },

    async loadingBsu({ full } = { full: true }) {
      try {
        if (this.controller) {
          this.controller.abort();
        }

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

        this.header = this.isGroup
          ? { name: groupData.data.header }
          : groupData.data.header;

        this.scheduleType = this.$router.currentRoute.name;

        this.body = groupData.data.schedule;
        this.isHeaderLoading = false;
        this.isBodyLoading = false;

        this.findCurrentLesson();

        this.$store.commit("SET_LAST", {
          type: this.$router.currentRoute.name,
          id: this.$route.params.id,
        });
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

        console.error(e);

        this.hasError = true;
        this.isHeaderLoading = true;
        this.isBodyLoading = false;


      }
    },

    async loading({ full } = { full: true }) {
      const fu = { group: "g", teacher: "t", location: "a" };

      try {
        if (this.controller) {
          this.controller.abort();
        }

        this.controller = new AbortController();

        this.scheduleType = this.$router.currentRoute.name;
        this.hasError = false;

        let url = "/schedule/";

        switch (this.scheduleType) {
          case "group":
            url += "g/";
            break;
          case "teacher":
            url += "t/";
            break;
          case "location":
            url += "a/";
            break;
          default:
            return;
        }

        this.isBodyLoading = true;
        this.dateRangePrev = this.dateRange;
        this.body = null;

        url += this.$route.params.id;

        let r = null;

        if (full) {
          this.isHeaderLoading = true;
          this.nextUpdate = 0;

          if (this.scheduleType[0] == "g") {
            this.header = { name: "Группа " + this.$route.params.id };
          } else {
            r = await fetch(url + "?info=1", {
              signal: this.controller.signal,
              credentials: "omit",
            });

            if (r.status == 404) {
              throw "not found";
            }

            if (!r.ok) {
              throw "fetch error";
            }

            r = await r.json();

            switch (this.scheduleType) {
              case "teacher":
                this.header = {
                  fullName: r.info1,
                  post: r.info2,
                };
                break;
              case "location":
                this.header = {
                  name: "Аудитория " + r.info1,
                  corp: r.info2,
                };
                break;
            }
          }
        }

        let d = new Date();
        let d2 = new Date();

        let ah = (c) => {
          return {
            number: c.pairnumber,
            ts: c.timestart,
            startTime: d.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Moscow',
            }),
            endTime: d2.toLocaleTimeString('ru-RU', {
              hour: '2-digit',
              minute: '2-digit',
              timeZone: 'Europe/Moscow',
            }),
            isNow: false,
            isToday: false,
            content: [ai(c)],
          };
        };

        let ai = (c) => {
          return {
            type: c.edworkkind,
            name: c.dis,
            online: c.online,
            subgroup: c.subgroup
              ? c.subgroup
                  .replace("подгруппа", "п/г")
                  .replace("иностранный язык", "ин. яз.")
                  .replace("русский язык как иностранный", "рус. яз.")
                  .replace("немецкий язык", "нем. яз.")
                  .replace("русский язык как иностанный", "рус. яз.")
                  .replace("русский как иностранный", "рус. яз.")
                  .replace("английский", "англ.")
                  .replace("русский", "рус.")
                  .replace("язык", "яз.")
              : null,
            links: c.links ? c.links : [],
            ...((this.scheduleType[0] == "g" ||
              this.scheduleType[0] == "t") && {
              location:
                c.room
                  ? {
                      id: c.room.id,
                      aud: c.room.name,
                      corp: c.room.area,
                      prompt: c.room.address,
                      specific: "",
                    }
                  : {
                      id: "",
                      aud: "",
                      corp: "",
                      prompt: "",
                      specific: c.online ? "Онлайн курс" : "",
                    },
            }),
            ...((this.scheduleType[0] == "g" ||
              this.scheduleType[0] == "l") && {
              teacher: oh,
            }),
            ...((this.scheduleType[0] == "t" ||
              this.scheduleType[0] == "l") && {
              group: c.group
                ? {
                    id: c.group.id,
                    name: c.group.name,
                    promt:
                      c.group.dep + ", " + c.group.edform + " форма обучения",
                  }
                : {
                    id: "",
                    name: "",
                    promt: "",
                  },
            }),
            subname: c.withdist ? "(с видеотрансляцией)" : "",
          };
        };

        let dayNames = [
          "Воскресенье",
          "Понедельник",
          "Вторник",
          "Среда",
          "Четверг",
          "Пятница",
          "Суббота",
        ];

        let oi = (c) => {
          return {
            date: d.toLocaleDateString("ru", { timeZone: "Europe/Moscow" }),
            dayWeek: dayNames[d.getDay()],
            lessons: [ah(c)],
            today: false,
          };
        };

        let oh = [];
        let ld = -1;

        this.type = this.scheduleType;

        r = await fetch(
          url +
            "?from=" +
            this.dateRange[0] +
            "&to=" +
            this.dateRange[1] +
            "&qdist=1",
          {
            signal: this.controller.signal,
            credentials: "omit",
          }
        );

        if (!r.ok) {
          throw "fetch error";
        }
        // TODO: Убрать в будущем
        r = await r.text();
        r = r.replaceAll("bsu.edu", "bsuedu")
        r = JSON.parse(r)

        this.body = r.reduce((p, c) => {
          d.setTime(c.timestart * 1000);
          d2.setTime(c.timeend * 1000);

          if (c.teacher) {
            oh = c.teacher.name.split(" ");

            oh = {
              id: c.teacher.id,
              surname: oh[0],
              name: oh[1],
              middlename: oh.length == 3 ? oh[2] : "",
              post: c.teacher.pos,
              promt:
                (c.teacher.dep ? c.teacher.dep : "") +
                " " +
                (c.teacher.subdep ? c.teacher.subdep : ""),
            };
          } else {
            oh = {
              id: "",
              surname: "",
              name: "",
              middlename: "",
              post: "",
              promt: "",
            };
          }

          if (d.getDay() != ld) {
            ld = d.getDay();

            return [...p, oi(c)];
          }

          let eh = p[p.length - 1];
          let leh = eh.lessons[eh.lessons.length - 1];

          if (leh.ts == c.timestart) {
            leh.content.push(ai(c));
          } else {
            eh.lessons.push(ah(c));
          }

          return p;
        }, []);

      } catch (e) {
        if (e && e.name == "AbortError") {
          return;
        }

        console.error(e);

        if (
          e == "not found" ||
          (this.$router.currentRoute.name == "group" &&
            this.$route.params.id.length < 8)
        ) {
          this.$router.push({ name: "notFound" });
          return;
        }

        await this.loadingBsu(full);
      }

      this.isHeaderLoading = false;
      this.isBodyLoading = false;

      this.findCurrentLesson();

      this.$store.commit("SET_LAST", {
        type: this.$router.currentRoute.name,
        id: this.$route.params.id,
      });
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
      dr[0] = this.d.toLocaleDateString("sv"); //  Canadian locale no longer matches ISO format (YYYY-mm-dd), use Sweden instead

      this.dateRangeLabel += " - ";

      // sunday
      this.d.setDate(this.d.getDate() + 6);
      this.timeTo = this.d.setHours(23, 59, 59);
      this.dateRangeLabel +=
        this.d.getDate() + " " + monthNames[this.d.getMonth()];
      dr[1] = this.d.toLocaleDateString("sv");

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
        this.loading({ full: true }).then();
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

      const tzOffset = (-180 - this.d.getTimezoneOffset()) * 60000;

      for (let day of this.body) {
        dayTime = Date.parse(day.date.replace(re, '$3-$2-$1T00:00:00'));

        if (dayTime == todayTime) {
          day.today = true;
          this.nowButtonVisible = true;

          for (let lesson of day.lessons) {
            m = lesson.startTime.split(':');
            lf = dayTime + m[0] * 3600000 + m[1] * 60000;

            m = lesson.endTime.split(':');
            lt = dayTime + m[0] * 3600000 + m[1] * 60000;

            if (tzOffset) {
              lf += tzOffset;
              lt += tzOffset;
            }

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
  border-inline-start: 6px solid #3f51b5;
}

.today--lesson {
  position: absolute;
  height: 100%;
  left: 0;

  border-inline-start: 5px solid rgba(63, 81, 181, 0.4);
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
