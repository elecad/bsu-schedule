<template>
  <v2-cupertino
    ref="cupertino-component"
    :isPresent="false"
    entryAnimation
    @did-dismiss="didCloseCupertino"
    @backdrop-tap="closeCupertino"
    :drawerOptions="drawerOptions"
    id="lesson-info"
  >
    <v-container fluid class="fix--margin--cupertino"></v-container>
  </v2-cupertino>
</template>

<script>
import V2Cupertino from "v2-cupertino";
export default {
  name: "moreLesson",
  components: { V2Cupertino },
  props: {
    sublesson: Object,
  },
  methods: {
    async showCupertino() {
      const cupertino = this.$refs["cupertino-component"].cupertino;
      document.getElementsByTagName("html")[0].style["overscroll-behavior-y"] =
        "contain";
      await cupertino.present({ animate: true });
    },
    closeCupertino() {
      const cupertino = this.$refs["cupertino-component"].cupertino;
      cupertino.hide();
      document.getElementsByTagName("html")[0].style["overscroll-behavior-y"] =
        "auto";
    },
    didCloseCupertino() {
      document.getElementsByTagName("html")[0].style["overscroll-behavior-y"] =
        "auto";
    },
  },
  data: () => ({
    drawerOptions: {
      bottomClose: true,
      fitHeight: true,
      backdropOpacity: 0.3,

      backdrop: true,
      breaks: {
        bottom: {
          enabled: false,
        },
        top: {
          enabled: false,
        },
      },
    },
  }),
};
</script>

<style scoped>
.fix--margin--cupertino {
  margin-bottom: 90px;
}

.v-card:before {
  display: none;
}
.fix--edit--favorite--button--position {
  position: absolute;
  right: 10px;
  bottom: 15px;
}
</style>
