<template>
  <div class="p-0">
    <div v-if="sublesson" class="px-3 py-4 fix--padding--more--lesson">
      <div class="sublesson--discipline--type">
        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          :color="selectColorsBodyChip(sublesson.type)"
          :text-color="selectColorsTextChip(sublesson.type)"
          >{{ sublesson.type }}</v-chip
        >
        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          color="teal darken-2"
          text-color="white"
          v-if="sublesson.subgroup"
          >{{ sublesson.subgroup }}</v-chip
        >
        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          v-if="sublesson.online"
          color="indigo"
          text-color="white"
        >
          онлайн</v-chip
        >
      </div>
      <div
        class="sublesson--discipline--name--bottom--sheet font-weight-medium mt-3 mb-5"
      >
        {{ sublesson.name }}
        <small class="text--disabled" v-if="sublesson.subname">{{
          sublesson.subname
        }}</small>
      </div>
      <div
        class="sublesson--discipline--teacher mt-2 text-caption"
        v-if="sublesson.teacher.surname"
      >
        <div class="mr-1">
          <v-icon>mdi-account</v-icon>
        </div>
        <div>
          {{
            `${sublesson.teacher.surname} ${sublesson.teacher.name} ${sublesson.teacher.middlename} (${sublesson.teacher.post})`
          }}
        </div>
      </div>
      <div
        class="sublesson--discipline--location text-caption"
        v-if="sublesson.location.aud || sublesson.location.specific"
      >
        <v-icon class="mr-1">mdi-map-marker</v-icon
        >{{
          sublesson.location.aud
            ? `ауд. ${sublesson.location.aud} ${sublesson.location.corp}`
            : sublesson.location.specific
        }}
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <div class="mb-5">
          <div
            class="sublesson--discipline--information--teacher my-2 text-caption"
            v-if="sublesson.teacher.surname"
          >
            <div class="mr-1">
              <v-icon>mdi-account-circle-outline</v-icon>
            </div>
            <div>{{ sublesson.teacher.promt }}</div>
          </div>
          <div
            class="sublesson--discipline--information--location text-caption"
            v-if="
              (sublesson.location.aud || sublesson.location.specific) &&
              !sublesson.online
            "
          >
            <div class="mr-1">
              <v-icon>mdi-map-marker-question-outline</v-icon>
            </div>

            <div>{{ sublesson.location.prompt }}</div>
          </div>
        </div>
        <v-row align="center" justify="center" no-gutters dense>
          <v-col cols="2" sm="1">
            <v-btn
              fab
              class="white--text"
              small
              elevation="0"
              color="indigo"
              :disabled="!sublesson.teacher.surname"
            >
              <v-icon dark> mdi-account </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" sm="2">
            <v-btn
              class="white--text"
              fab
              small
              elevation="0"
              color="indigo"
              :disabled="!sublesson.location.aud"
            >
              <v-icon> mdi-map-marker </v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-row no-gutters dense justify="end">
            <v-col class="d-flex justify-end">
              <div class="d-flex flex-column">
                <v-btn
                  v-for="(link, i) in sublesson.links"
                  :key="i"
                  depressed
                  color="indigo"
                  dark
                  class="fix--font--size--course--buttons ma-2"
                  :href="link.href"
                  target="_blank"
                >
                  {{ link.name }}
                </v-btn>
              </div>
            </v-col>
          </v-row>
        </v-row>
      </div>
    </div>
  </div>
</template>

<script>
import Colors from "@/class/Colors";

export default {
  name: "moreLesson",
  components: {},

  computed: {},
  watch: {
    sublesson() {
      console.log(this.sublesson ? this.sublesson.location.aud : false);
      console.log(this.sublesson.location.aud == false);
    },
  },
  props: {
    sublesson: Object,
    isOpen: Boolean,
  },
  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
  },
  data: () => ({}),
  mounted() {},
};
</script>

<style scoped>
.v-card:before {
  display: none;
}
.fix--edit--favorite--button--position {
  position: absolute;
  right: 10px;
  bottom: 15px;
}

.fix--padding--more--lesson {
  margin-bottom: 70px;
}

.sublesson--discipline--name--bottom--sheet {
  font-size: 1.2rem;
  line-height: 1;
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
</style>
