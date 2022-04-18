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
    <schedule-body :loading="isBodyLoading" :body="body"></schedule-body>
  </div>
</template>

<script>
import scheduleHead from "@/components/mobile/Schedule/group/Header/TheHeaderSchedule.vue";
import scheduleBody from "@/components/mobile/Schedule/group/Body/TheBodySchedule.vue";
import dateAPI from "@/class/DateAPI";
import parsers from "@/parser/parsers";

export default {
  name: "Schedule",
  components: { scheduleHead, scheduleBody },
  computed: {
    dateISO() {
      return this.dataAPI.getDateISO();
    },
  },
  data: () => ({
    dataAPI: new dateAPI(new Date(), true),
    header: null,
    body: null,
    isHeaderLoading: true,
    isBodyLoading: true,
    Parsers: new parsers(),
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
        const groupData = await this.Parsers.fetchGroup({
          group: this.$route.params.id,
          week: dateBsuFormat,
        });

        this.header = groupData.data.header;
        this.body = groupData.data.schedule;

        this.isHeaderLoading = false;
        this.isBodyLoading = false;
      } catch (e) {
        console.log(e);
      }
    },
  },
  created() {
    if (this.validate()) {
      this.loading();
    } else {
      //! 404
    }
  },
};
</script>

<style></style>
