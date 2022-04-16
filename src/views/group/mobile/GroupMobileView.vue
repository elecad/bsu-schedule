<template>
  <div>
    <schedule-nav-bar-mobile></schedule-nav-bar-mobile>

    <v-main> </v-main>
  </div>
</template>

<script>
import scheduleNavBarMobile from "@/components/NavBarMobile/TheNavbarMobile.vue";
export default {
  name: "GroupMobileView",
  components: { scheduleNavBarMobile },
};
</script>

<style></style>
