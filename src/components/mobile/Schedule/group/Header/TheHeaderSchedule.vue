<template>
  <v-card v-if="type != 'welcome'">
    <v-card-title>
      <div
        class="d-flex justify-space-between align-center fix--width--shedule--header"
      >
        <div class="flex-grow-1">
          <v-fade-transition leave-absolute>
            <div v-if="!loading && type">
              <h3 class="fix--text" v-if="isGroup">
                {{ header.name }}
              </h3>

              <div class="fix--text fix--word--break" v-if="isLocation">
                <h3 class="d-flex">
                  {{ header.name }}
                </h3>
                <div class="text--disabled text-body-2">
                  {{ header.corp }}
                </div>
              </div>

              <div
                class="fix--text fix--word--break"
                v-if="isTeacher"
                @click="tooltipShow = !tooltipShow"
                di
              >
                <h3 class="d-flex">
                  {{ abbreviation }}

                  <div class="ml-2">
                    <v-icon>mdi-information-variant</v-icon>
                  </div>
                </h3>
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
        </div>
        <div>
          <v-btn icon @click="favoritAction">
            <v-icon>{{ isFavorite ? "mdi-star" : "mdi-star-outline" }}</v-icon>
          </v-btn>
        </div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1">
      <app-date-picker-mobile
        :dateAPI="dateAPI"
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
    dateAPI: Object,
    type: String,
  },

  watch: {},

  computed: {
    abbreviation() {
      const arr = this.header.fullName.split(" ");
      return `${arr[0]} ${arr[1][0]}.${arr.length == 3 ? arr[2][0] + "." : ""}`;
    },

    getFavorite() {
      return this.$store.getters.getFavorite;
    },

    isFavorite() {
      const id = this.$route.params.id;
      return this.getFavorite.find(
        (fav) => fav.type == this.type && fav.id == id
      )
        ? true
        : false;
    },
    getId() {
      return this.$route.params.id;
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
    getLabel() {
      if (this.isGroup) {
        return this.header.name.split(" ")[1];
      } else if (this.isTeacher) {
        return this.abbreviation;
      } else if (this.isLocation) {
        return `${this.header.name.split(" ")[1]},${this.header.corp}`;
      }
    },
  },

  components: {
    appDatePickerMobile,
  },
  data: () => ({
    tooltipShow: false,
  }),
  methods: {
    dateWeek(date) {
      this.$emit("date--week", date);
    },
    favoritAction() {
      if (this.isFavorite) {
        this.$store.commit("REMOVE_FAVORITE", {
          type: this.type,
          id: this.getId,
        });
      } else {
        this.$store.commit("ADD_FAVORITE", {
          type: this.type,
          id: this.getId,
          label: this.getLabel,
        });
      }
    },
  },
};
</script>

<style scoped>
.v-skeleton-loader__chip {
  width: 150px !important;
}

.fix--text {
  white-space: normal;
  word-break: break-word;
}

.fix--width--shedule--header {
  width: 100%;
}

@media (max-width: 317px) {
  .fix--text {
    font-size: 1.1rem !important;
  }
}
</style>
