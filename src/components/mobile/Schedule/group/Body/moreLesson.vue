<template>
  <div class="p-0">
    <div v-if="more" class="px-3 py-4 fix--padding--more--lesson">
      <div class="sublesson--discipline--type">
        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          :color="selectColorsBodyChip(more.sublesson.type)"
          :text-color="selectColorsTextChip(more.sublesson.type)"
          >{{ more.sublesson.type }}</v-chip
        >
        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          color="teal darken-2"
          text-color="white"
          v-if="more.sublesson.subgroup"
          :ripple="more.sublesson.subgroup.length > 14"
          @click.native="showSnackBar"
        >
          <span class="fix--width--chip--subgrpup"
            >{{ more.sublesson.subgroup }}
          </span></v-chip
        >

        <v-chip
          class="mr-1 mb-1 elevation-1"
          small
          v-if="more.sublesson.online"
          color="indigo"
          text-color="white"
        >
          онлайн</v-chip
        >
      </div>
      <div
        class="sublesson--discipline--name--bottom--sheet font-weight-medium mt-3 mb-5 mr-2"
      >
        <div class="now--lesson--bottom--sheet" v-if="isNow">●</div>
        {{ more.sublesson.name }}
        <small class="text--disabled" v-if="more.sublesson.subname">{{
          more.sublesson.subname
        }}</small>
      </div>

      <!-- //! Группа занятия -->
      <div v-if="!isGroup">
        <div
          class="sublesson--discipline--group text-caption"
          v-if="more.sublesson.group"
        >
          <div class="mr-1">
            <v-icon>mdi-account-supervisor</v-icon>
          </div>
          <div class="">{{ more.sublesson.group.name }}</div>
        </div>
      </div>

      <!-- //! Преподаватель занятия -->
      <div v-if="!isTeacher">
        <div
          class="sublesson--discipline--teacher text-caption"
          v-if="more.sublesson.teacher.surname"
        >
          <div class="mr-1">
            <v-icon>mdi-account</v-icon>
          </div>
          <div>
            {{
              `${more.sublesson.teacher.surname} ${more.sublesson.teacher.name} ${more.sublesson.teacher.middlename} (${more.sublesson.teacher.post})`
            }}
          </div>
        </div>
      </div>

      <!-- //! Место проведения занятия -->
      <div v-if="!isLocation">
        <div
          class="sublesson--discipline--location text-caption"
          v-if="more.sublesson.location.aud || more.sublesson.location.specific"
        >
          <div class="mr-1">
            <v-icon>mdi-map-marker</v-icon>
          </div>
          <div>
            {{
              more.sublesson.location.aud
                ? `ауд. ${more.sublesson.location.aud} ${more.sublesson.location.corp}`
                : more.sublesson.location.specific
            }}
          </div>
        </div>
      </div>

      <v-divider class="my-4"></v-divider>

      <div>
        <div class="mb-5">
          <!-- //! Дополнительная информация о группе -->
          <div v-if="!isGroup">
            <div
              class="sublesson--discipline--information--group my-2 text-caption"
              v-if="more.sublesson.group.promt"
            >
              <div class="mr-1">
                <v-icon>mdi-account-supervisor-circle</v-icon>
              </div>

              <div>{{ more.sublesson.group.promt }}</div>
            </div>
          </div>
          <!-- //! Дополнительная информация о преподавателе -->
          <div v-if="!isTeacher">
            <div
              class="sublesson--discipline--information--teacher my-2 text-caption"
              v-if="more.sublesson.teacher.surname"
            >
              <div class="mr-1">
                <v-icon>mdi-account-circle-outline</v-icon>
              </div>
              <div>{{ more.sublesson.teacher.promt }}</div>
            </div>
          </div>
          <!-- //! Дополнительная информация о месте проведения -->
          <div v-if="!isLocation">
            <div
              class="sublesson--discipline--information--location text-caption"
              v-if="
                (more.sublesson.location.aud ||
                  more.sublesson.location.specific) &&
                !more.sublesson.online
              "
            >
              <div class="mr-1">
                <v-icon>mdi-map-marker-question-outline</v-icon>
              </div>

              <div>{{ more.sublesson.location.prompt }}</div>
            </div>
          </div>
        </div>

        <v-row align="center" justify="center" no-gutters dense>
          <v-col cols="2" sm="1">
            <!-- //! Переход к расписанию преподавателя -->
            <v-btn
              fab
              class="white--text"
              small
              elevation="0"
              color="indigo"
              :disabled="!more.sublesson.teacher.surname"
              v-if="!isTeacher"
              @click="goNewShedule($event, 'teacher')"
            >
              <v-icon dark> mdi-account </v-icon>
            </v-btn>
            <!-- //! Переход к расписанию группы -->
            <v-btn
              fab
              class="white--text"
              small
              elevation="0"
              color="indigo"
              :disabled="!more.sublesson.group"
              v-if="!(isGroup || isLocation)"
              @click="goNewShedule($event, 'group')"
            >
              <v-icon dark> mdi-account-supervisor </v-icon>
            </v-btn>
          </v-col>
          <v-col cols="2" sm="2">
            <!-- //! Переход к расписанию аудитории -->
            <v-btn
              v-if="!isLocation"
              class="white--text"
              fab
              small
              elevation="0"
              color="indigo"
              :disabled="!more.sublesson.location.aud"
              @click="goNewShedule($event, 'location')"
            >
              <v-icon> mdi-map-marker </v-icon>
            </v-btn>
            <!-- //! Переход к расписанию группы -->
            <v-btn
              fab
              class="white--text"
              small
              elevation="0"
              color="indigo"
              :disabled="!more.sublesson.group"
              v-if="!(isGroup || isTeacher)"
              @click="goNewShedule($event, 'group')"
            >
              <v-icon dark> mdi-account-supervisor </v-icon>
            </v-btn>
          </v-col>
          <v-spacer></v-spacer>
          <v-row no-gutters dense justify="end">
            <v-col class="d-flex justify-end">
              <div class="d-flex flex-column">
                <v-btn
                  v-for="(link, i) in more.sublesson.links"
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
                  v-if="more.sublesson.links.length == 0"
                  depressed
                  color="indigo"
                  class="fix--font--size--course--buttons ma-2 white--text"
                  disabled
                >
                  В курс
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

  computed: {
    isGroup() {
      return this.more.type == "group";
    },

    isLocation() {
      return this.more.type == "location";
    },

    isTeacher() {
      return this.more.type == "teacher";
    },
    isNow() {
      return this.more.isNow;
    },
  },

  props: {
    more: Object,
    isOpen: Boolean,
    loading: Boolean,
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
          obj = { name: type, params: { id: this.more.sublesson.group.id } };
          break;
        case "teacher":
          obj = { name: type, params: { id: this.more.sublesson.teacher.id } };
          break;
        case "location":
          obj = { name: type, params: { id: this.more.sublesson.location.id } };
          break;
      }
      this.$router.push(obj);
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    showSnackBar() {
      if (this.more.sublesson.subgroup.length > 14) {
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

<style scoped>
.now--lesson--bottom--sheet {
  color: #5c6bc0;
  position: absolute;
  right: 15px;
}

.fix--padding--more--lesson {
  margin-bottom: 70px;
}

.sublesson--discipline--name--bottom--sheet {
  font-size: 1.2rem;
  line-height: 1;
}

</style>
