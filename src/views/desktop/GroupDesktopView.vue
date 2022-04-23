<template>
  <div>
    <shedule-drawer></shedule-drawer>
    <v-main><schedule></schedule> </v-main>
  </div>
</template>

<script>
import sheduleDrawer from "@/components/desktop/Drawer/Drawer.vue";
import schedule from "@/components/desktop/Shedule/TheSchedule.vue";

export default {
  name: "GroupDesktopView",
  components: { sheduleDrawer, schedule },
};
</script>

<style></style>
