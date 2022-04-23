<template>
  <v-navigation-drawer permanent app width="320">
    <div class="logo mt-4 mb-6">
      <div class="d-flex align-center justify-center">
        <div class="fix--position--icon">
          <v-icon>mdi-school-outline</v-icon>
        </div>
        <v-toolbar-title>Расписание</v-toolbar-title>
      </div>
    </div>

    <div class="mb-5 mx-3"><schedule-search></schedule-search></div>

    <div class="mb-5 mx-3"><schedule-favorite></schedule-favorite></div>
  </v-navigation-drawer>
</template>

<script>
import scheduleSearch from "@/components/desktop/Drawer/Search.vue";
import scheduleFavorite from "@/components/desktop/Favorite/AppFavorite.vue";

export default {
  name: "Drawer",
  components: { scheduleSearch, scheduleFavorite },
};
</script>

<style scoped>
.fix--position--icon {
  position: absolute;
  left: 60px;
}
</style>
