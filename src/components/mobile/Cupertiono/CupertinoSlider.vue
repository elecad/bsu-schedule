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
    <v-container fluid class="fix--margin--cupertino">
      <slot></slot>
    </v-container>
  </v2-cupertino>
</template>

<script>
import V2Cupertino from "v2-cupertino";
export default {
  name: "CupertinoSlider",
  components: { V2Cupertino },
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

<style></style>
