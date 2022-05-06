<template>
  <!--//! <v-expansion-panel-content class="fix--transition"> -->
  <v-expansion-panel-content
    class="p-0"
    :class="{ 'fix--transition': weakDesktop }"
  >
    <div v-if="more" class="">
      <div>
        <div class="mb-5">
          <!-- //! Дополнительная информация о группе -->
          <div v-if="!isGroup">
            <div
              class="sublesson--discipline--information--group my-2 text-caption"
              v-if="more.group.promt && more.group.id"
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
          <v-tooltip bottom open-delay="300">
            <template v-slot:activator="{ on }">
              <router-link
                :to="{
                  name: 'teacher',
                  params: { id: more.teacher.id ? more.teacher.id : 0 },
                }"
                custom
                v-slot="{ navigate, href }"
                v-if="!isTeacher"
              >
                <v-btn
                  v-on="on"
                  fab
                  class="white--text mr-4"
                  small
                  elevation="0"
                  color="indigo"
                  :disabled="!(more.teacher.surname && more.teacher.id)"
                  :href="href"
                  @click="navigate"
                >
                  <v-icon dark>mdi-account</v-icon>
                </v-btn>
              </router-link>
            </template>
            <span class="tooltip--text"
              >Переход к расписанию преподавателя</span
            >
          </v-tooltip>

          <!-- //! Переход к расписанию группы -->
          <v-tooltip bottom open-delay="300">
            <template v-slot:activator="{ on }">
              <router-link
                :to="{
                  name: 'group',
                  params: { id: more.group.id ? more.group.id : 0 },
                }"
                custom
                v-slot="{ navigate, href }"
                v-if="!isGroup"
              >
                <v-btn
                  fab
                  v-on="on"
                  class="white--text mr-4"
                  small
                  elevation="0"
                  color="indigo"
                  :disabled="!(more.group && more.group.id)"
                  :href="href"
                  @click="navigate"
                >
                  <v-icon dark> mdi-account-supervisor </v-icon>
                </v-btn>
              </router-link>
            </template>
            <span class="tooltip--text">Переход к расписанию группы</span>
          </v-tooltip>

          <!-- //! Переход к расписанию аудитории -->
          <v-tooltip bottom open-delay="300">
            <template v-slot:activator="{ on }">
              <router-link
                :to="{
                  name: 'location',
                  params: { id: more.location.id ? more.location.id : 0 },
                }"
                custom
                v-slot="{ navigate, href }"
                v-if="!isLocation"
              >
                <v-btn
                  v-if="!isLocation"
                  class="white--text mr-4"
                  v-on="on"
                  fab
                  small
                  elevation="0"
                  color="indigo"
                  :disabled="!(more.location.aud && more.location.id)"
                  :href="href"
                  @click="navigate"
                >
                  <v-icon>mdi-map-marker</v-icon>
                </v-btn>
              </router-link>
            </template>
            <span class="tooltip--text">Переход к расписанию аудитории</span>
          </v-tooltip>
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
    weakDesktop() {
      return this.$store.getters.getSettings.weakDesktop;
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
