<template>
  <v-btn
    color="indigo"
    dark
    fab
    :class="{
      'fix--button--floating--with--current': hasCurrentButton,
      'fix--button--floating--without--current': !hasCurrentButton,
    }"
    @click="up"
  >
    <v-icon>mdi-arrow-up</v-icon>
  </v-btn>
</template>

<script>
export default {
  name: "AppScrollButton",
  props: {
    hasCurrentButton: Boolean,
  },
  methods: {
    up() {
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
  },
};
</script>

<style scoped>
.fix--button--floating--with--current {
  position: fixed;
  z-index: 10;
  bottom: 80px;
  right: 30px;
}

.fix--button--floating--without--current {
  position: fixed;
  z-index: 10;
  bottom: 15px;
  right: 30px;
}

.fix--button--floating::before {
  display: none;
}
</style>
