<template>
  <!--//! <v-expansion-panel-content class="fix--transition"> -->
  <v-expansion-panel-content class="p-0">
    <div v-if="more" class="">
      <div>
        <div class="mb-5">
          <!-- //! Дополнительная информация о группе -->
          <div v-if="!isGroup">
            <div
              class="sublesson--discipline--information--group my-2 text-caption"
              v-if="more.group.promt"
            >
              <div class="mr-1">
                <v-icon>mdi-account-supervisor-circle</v-icon>
              </div>

              <div>{{ more.group.promt }}</div>
            </div>
          </div>

          <!-- //! Дополнительная информация о преподавателе -->
          <div v-if="!isTeacher">
            <div
              class="sublesson--discipline--information--teacher my-2 text-caption"
              v-if="more.teacher.surname"
            >
              <div class="mr-1">
                <v-icon>mdi-account-circle-outline</v-icon>
              </div>

              <div>{{ more.teacher.promt }}</div>
            </div>
          </div>
          <!-- //! Дополнительная информация о месте проведения -->
          <div v-if="!isLocation">
            <div
              class="sublesson--discipline--information--location text-caption"
              v-if="
                (more.location.aud || more.location.specific) && !more.online
              "
            >
              <div class="mr-1">
                <v-icon>mdi-map-marker-question-outline</v-icon>
              </div>

              <div>{{ more.location.prompt }}</div>
            </div>
          </div>
        </div>
      </div>

      <v-row align="center" justify="center" no-gutters dense>
        <div>
          <!-- //! Переход к расписанию преподавателя -->
          <v-btn
            fab
            class="white--text mr-4"
            small
            elevation="0"
            color="indigo"
            :disabled="!more.teacher.surname"
            v-if="!isTeacher"
            @click="goNewShedule($event, 'teacher')"
          >
            <v-icon dark> mdi-account </v-icon>
          </v-btn>
          <!-- //! Переход к расписанию группы -->
          <v-btn
            fab
            class="white--text mr-4"
            small
            elevation="0"
            color="indigo"
            :disabled="!more.group"
            v-if="!isGroup"
            @click="goNewShedule($event, 'group')"
          >
            <v-icon dark> mdi-account-supervisor </v-icon>
          </v-btn>

          <!-- //! Переход к расписанию аудитории -->
          <v-btn
            v-if="!isLocation"
            class="white--text mr-4"
            fab
            small
            elevation="0"
            color="indigo"
            :disabled="!more.location.aud"
            @click="goNewShedule($event, 'location')"
          >
            <v-icon> mdi-map-marker </v-icon>
          </v-btn>
        </div>

        <v-spacer></v-spacer>

        <v-row no-gutters dense justify="end">
          <v-col class="d-flex justify-end">
            <v-btn
              v-for="(link, i) in more.links.slice().reverse()"
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
            <v-btn
              v-if="more.links.length == 0"
              depressed
              color="indigo"
              class="fix--font--size--course--buttons ma-2 white--text"
              disabled
            >
              В курс
            </v-btn>
          </v-col>
        </v-row>
      </v-row>
    </div>
  </v-expansion-panel-content>
</template>

<script>
import Colors from "@/class/Colors";

export default {
  name: "PanelContent",
  components: {},

  computed: {
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

  props: {
    more: Object,
    isOpen: Boolean,
    loading: Boolean,
    type: String,
  },
  methods: {
    selectColorsBodyChip(text) {
      return Colors.selectBodyColor(text);
    },
    selectColorsTextChip(text) {
      return Colors.selectTextColor(text);
    },
    goNewShedule(_, type) {
      let obj = null;
      switch (type) {
        case "group":
          obj = { name: type, params: { id: this.more.group.id } };
          break;
        case "teacher":
          obj = { name: type, params: { id: this.more.teacher.id } };
          break;
        case "location":
          obj = { name: type, params: { id: this.more.location.id } };
          break;
      }
      this.$router.push(obj);
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    showSnackBar() {
      if (this.more.subgroup.length > 14) {
        this.$emit("open--snakbar--subgroup");
      }
    },
  },
  data: () => ({
    tooltipShow: false,
  }),
  mounted() {},
};
</script>