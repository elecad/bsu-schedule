<template>
  <v-card>
    <v-card-title>
      <v-fade-transition leave-absolute>
        <div v-if="!loading && type">
          <h3 class="fix--text" v-if="isGroup || isLocation">
            {{ header.name }}
          </h3>

          <!-- <h3 class="fix--text" v-if="isLocation">
            {{ header.name }}
          </h3> -->

          <div
            class="fix--text fix--word--break"
            v-if="isTeacher"
            @click="tooltipShow = !tooltipShow"
          >
            <h3 class="">{{ abbreviation }}</h3>
            <div class="text--disabled text-body-2">
              {{ header.post.toLowerCase() }}
            </div>

            <v-snackbar v-model="tooltipShow" timeout="2000" class="mb-6">
              <div class="d-flex align-center justify-center">
                <div>{{ header.fullName }}</div>
              </div>
            </v-snackbar>
          </div>
        </div>

        <v-skeleton-loader
          type="chip"
          class="p-0 m-0 v-skeleton-loader__chip"
          v-if="loading || !type"
        ></v-skeleton-loader>
      </v-fade-transition>

      <v-spacer></v-spacer>
      <v-btn icon @click="$emit('add-fovorite-item')">
        <v-icon>{{ favorit ? "mdi-star" : "mdi-star-outline" }}</v-icon>
      </v-btn>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1">
      <app-date-picker-mobile
        :dateISO="dateISO"
        @next--week="$emit('next--week')"
        @back--week="$emit('back--week')"
        @date--week="dateWeek"
      ></app-date-picker-mobile>
    </v-card-text>
  </v-card>
</template>

<script>
import appDatePickerMobile from "@/components/mobile/DatePicker/TheDatePicker.vue";

export default {
  name: "scheduleHeader",
  props: {
    header: Object,
    loading: Boolean,
    dateISO: String,
    type: String,
  },

  watch: {},

  computed: {
    abbreviation() {
      // console.log(this.header);
      const arr = this.header.fullName.split(" ");
      return `${arr[0]} ${arr[1][0]}.${arr.length == 3 ? arr[2][0] + "." : ""}`;
      // return "test";
    },
    isGroup() {
      return this.type == "group";
    },

    isLocation() {
      return this.type == "location";
    },

    isTeacher() {
      return this.type == "teacher";
    },
  },

  components: {
    appDatePickerMobile,
  },
  data: () => ({
    favorit: true,
    tooltipShow: false,
  }),
  methods: {
    dateWeek(date) {
      this.$emit("date--week", date);
    },
  },
};
</script>

<style scoped>
.v-skeleton-loader__chip {
  width: 150px !important;
}

.fix--text {
  overflow: visible;
  white-space: nowrap;
}

.fix--word--break {
  word-break: break-all;
}

@media (max-width: 317px) {
  .fix--text {
    font-size: 1.1rem !important;
  }
}
</style>
