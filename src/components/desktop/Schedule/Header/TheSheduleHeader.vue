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
                  {{ header.fullName }}
                </h3>
                <div class="text--disabled text-body-2">
                  {{ header.post.toLowerCase() }}
                </div>
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
          <v-fab-transition>
            <v-btn v-if="!loading" icon @click="favoritAction">
              <v-icon>{{
                isFavorite ? "mdi-star" : "mdi-star-outline"
              }}</v-icon>
            </v-btn>
          </v-fab-transition>
        </div>
      </div>
    </v-card-title>
    <v-divider></v-divider>
    <v-card-text class="py-1 d-flex align-center justify-center">
      <v-btn-toggle tile group>
        <v-btn @click="$emit('back--week')" text>
          <v-icon>mdi-arrow-left</v-icon>
        </v-btn>
        <v-scale-transition>
          <v-badge
            v-if="autoChange"
            color="indigo"
            overlap
            content="АВТО"
            class="auto--badge"
          >
          </v-badge>
        </v-scale-transition>
        <v-btn
          class="edit--text--button"
          text
          @click="$emit('date--week', new Date().toISOString().substr(0, 10))"
        >
          Текущая неделя
        </v-btn>

        <v-btn @click="$emit('next--week')" text>
          <v-icon>mdi-arrow-right</v-icon>
        </v-btn>
      </v-btn-toggle>
    </v-card-text>
  </v-card>
</template>

<script>
import appDatePickerMobile from "@/components/mobile/DatePicker/TheDatePicker.vue";

export default {
  name: "scheduleHeaderDesktop",
  props: {
    header: Object,
    loading: Boolean,
    type: String,
    autoChange: Boolean,
  },

  watch: {},

  computed: {
    abbreviation() {
      const arr = this.header.fullName.split(" ");
      return `${arr[0]} ${arr[1][0]}.${arr.length == 3 ? arr[2][0] + "." : ""}`;
    },

    isFavorite() {
      const id = this.$route.params.id;
      return this.getFavorite.find(
        (fav) => fav.type == this.type && fav.id == id
      )
        ? true
        : false;
    },

    getFavorite() {
      return this.$store.getters.getFavorite;
    },
    getType() {
      return this.$router.currentRoute.name;
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
  },

  components: {
    appDatePickerMobile,
  },
  data: () => ({
    tooltipShow: false,
  }),
  methods: {
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

.auto--badge {
  position: absolute;
  left: calc(50% - 42.39px / 4);
  /* left: calc (100% - 42.39px / 2); */
  top: -6px;
}
</style>
