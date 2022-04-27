<template>
  <v-navigation-drawer
    permanent
    app
    width="400"
    class="fix--navigation--drawer elevation-1ы"
  >
    <div class="logo mt-4 mb-6">
      <div
        class="d-flex align-center justify-center fix--position--up--block--icon"
      >
        <div class="fix--position--icon--logo">
          <v-icon>mdi-school-outline</v-icon>
        </div>
        <v-toolbar-title> Расписание</v-toolbar-title>
        <v-btn
          class="fix--position--icon--settings"
          icon
          @click="settingsOpen = true"
        >
          <v-icon>mdi-cog</v-icon>
        </v-btn>
        <app-settings v-model="settingsOpen"></app-settings>
      </div>
    </div>

    <div>
      <div class="mb-5 mx-3"><desktop-search></desktop-search></div>

      <div class="mb-5 mx-3">
        <desktop-datapicker
          :dateISO="dateISO"
          :dateAPI="dateAPI"
          @date--week="dateWeek"
        ></desktop-datapicker>
      </div>

      <div class="mx-3"><desktop-favorite></desktop-favorite></div>
    </div>
  </v-navigation-drawer>
</template>

<script>
import desktopSearch from "@/components/desktop/Drawer/Search.vue";
import desktopFavorite from "@/components/desktop/Favorite/AppFavorite.vue";
import desktopDatapicker from "@/components/desktop/Drawer/DataPicker.vue";
import appSettings from "@/components/general/AppSettings.vue";

export default {
  name: "Drawer",
  props: {
    dateISO: String,
    dateAPI: Object,
  },
  components: {
    desktopSearch,
    desktopFavorite,
    desktopDatapicker,
    appSettings,
  },
  methods: {
    dateWeek(date) {
      this.$emit("date--week", date);
    },
  },

  data: () => ({
    settingsOpen: false,
  }),
};
</script>

<style scoped>
.fix--position--up--block--icon {
  position: relative;
}
.fix--position--icon--logo {
  position: absolute;
  left: 100px;
}

.fix--position--icon--settings {
  position: absolute;
  right: 10px;
  top: calc(50% - 18px);
}
</style>
