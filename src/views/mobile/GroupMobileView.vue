<template>
  <div>
    <v-main class="px-0">
      <v-container class="pa-2">
        <schedule class="mb-3"></schedule>
      </v-container>
    </v-main>
  </div>
</template>

<script>
import schedule from "@/components/mobile/Schedule/group/TheSchedule.vue";

export default {
  name: "GroupMobileView",
  components: { schedule },
};
</script>

<style></style>
