<template>
  <div>
    <schedule-head
      class="mb-3"
      :header="header"
      :loading="isHeaderLoading"
      :dateISO="dateISO"
      @next--week="nextWeek"
      @back--week="backWeek"
      @date--week="dateWeek"
    ></schedule-head>
    <schedule-body
      :loading="isBodyLoading"
      :body="body"
      :nowButton="nowButtonVisible"
    ></schedule-body>
    <schedule-footer></schedule-footer>
  </div>
</template>

<script>
import scheduleHead from "@/components/mobile/Schedule/group/Header/TheHeaderSchedule.vue";
import scheduleBody from "@/components/mobile/Schedule/group/Body/TheBodySchedule.vue";
import scheduleFooter from "@/components/mobile/Footer/Footer.vue";
import dateAPI from "@/class/DateAPI";
import parsers from "@/parser/parsers";

export default {
  name: "Schedule",
  components: { scheduleHead, scheduleBody, scheduleFooter },
  computed: {
    dateISO() {
      return this.dataAPI.getDateISO();
    },
    isGroup() {
      return this.$router.currentRoute.name == "group";
    },

    isLocation() {
      return this.$router.currentRoute.name == "location";
    },

    isTeacher() {
      return this.$router.currentRoute.name == "teacher";
    },
  },
  data: () => ({
    dataAPI: new dateAPI(new Date(), true),
    header: null,
    body: null,
    isHeaderLoading: true,
    isBodyLoading: true,
    Parsers: new parsers(),
    nowButtonVisible: false,
  }),
  methods: {
    validate() {
      return (
        this.$route.params.id.length == 8 &&
        Number.isInteger(Number(this.$route.params.id))
      );
    },

    nextWeek() {
      this.dataAPI.goNextWeek();
      this.loading();
      console.log("NEXT");
    },

    backWeek() {
      this.dataAPI.goBackWeek();
      this.loading();
      console.log("BACK");
    },

    dateWeek(date) {
      console.log(date);
    },

    async loading() {
      try {
        const dateBsuFormat = this.dataAPI.getDateForBsuAPI();
        let groupData = {};
        console.log("Route: ", this.$router.currentRoute.name);
        switch (this.$router.currentRoute.name) {
          case "group":
            groupData = await this.Parsers.fetchGroup({
              group: this.$route.params.id,
              week: dateBsuFormat,
            });
            break;
          case "teacher":
            groupData = await this.Parsers.fetchTeacher({
              teacher: this.$route.params.id,
              week: dateBsuFormat,
            });
            break;
          case "location":
            groupData = await this.Parsers.fetchLocation({
              location: this.$route.params.id,
              week: dateBsuFormat,
            });
            break;
        }

        this.header = this.isGroup
          ? { name: groupData.data.header }
          : groupData.data.header;
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

    findCurrentLesson() {
      const today = this.dataAPI.getTodayBsuAPI(new Date()); // сегодня в виже строки
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
    this.loading();
    if (this.validate()) {
      // this.loading();
    } else {
      //! 404
    }
  },
};
</script>

<style></style>
