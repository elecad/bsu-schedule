<template>
  <v2-cupertino
    ref="cupertino-component"
    :isPresent="false"
    entryAnimation
    @did-dismiss="didCloseCupertino"
    @backdrop-tap="closeCupertino"
    :drawerOptions="drawerOptions"
  >
    <v-container fluid class="fix--margin--cupertino">
      <div class="text-h5 font-weight-medium mb-5">Избранное</div>
      <div class="mb-4">
        <app-favorite-chip :edit="editFavirite" type="group"
          >12001902</app-favorite-chip
        >
        <app-favorite-chip :edit="editFavirite" type="teacher"
          >Бурданова Е. В.</app-favorite-chip
        >
        <app-favorite-chip :edit="editFavirite" type="location"
          >4-17, Учебный корпус №15</app-favorite-chip
        >
      </div>

      <v-btn
        class="mx-2 elevation-0 fix--edit--favorite--button--position"
        fab
        dark
        color="indigo"
        @click="editFavirite = !editFavirite"
      >
        <v-icon dark>
          {{ editFavirite ? "mdi-check" : "mdi-pencil" }}
        </v-icon>
      </v-btn>
    </v-container>
  </v2-cupertino>
</template>

<script>
import V2Cupertino from "v2-cupertino";
import appFavoriteChip from "@/components/mobile/Favorite/AppFavoriteChip.vue";

export default {
  name: "faviriteMobile",
  components: { V2Cupertino, appFavoriteChip },
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
    editFavirite: false,
  }),
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
