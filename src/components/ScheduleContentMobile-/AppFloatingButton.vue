<template>
  <v-btn
    color="indigo"
    dark
    fab
    class="fix--button--floating"
    @click="$emit('scroll--now--day')"
  >
    <v-icon>mdi-calendar-arrow-right</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "AppFloatingButton",
};
</script>

<style scoped>
.fix--button--floating {
  position: fixed;
  z-index: 10;
  bottom: 15px;
  right: 20px;
}

.fix--button--floating::before {
  display: none;
}
</style>
