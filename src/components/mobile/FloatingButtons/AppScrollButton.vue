<template>
  <v-btn color="indigo" dark fab class="fix--button--floating" @click="up">
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "AppScrollButton",
  methods: {
    up() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.fix--button--floating {
  position: fixed;
  z-index: 10;
  bottom: 15px;
  left: 20px;
}

.fix--button--floating::before {
  display: none;
}
</style>
