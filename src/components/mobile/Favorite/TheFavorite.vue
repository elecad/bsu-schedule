<template>
  <v-sheet>
    <v-container fluid class="pa-0">
      <div class="text-h5 font-weight-medium mb-5">Избранное</div>
      <div class="fix--padding--cupertino">
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
  </v-sheet>
</template>

<script>
import appFavoriteChip from "@/components/mobile/Favorite/AppFavoriteChip.vue";

export default {
  name: "faviriteMobile",
  components: { appFavoriteChip },
  props: { isOpen: Boolean },
  data: () => ({
    editFavirite: false,
  }),
  methods: {},
};
</script>

<style scoped>
.fix--padding--cupertino {
  padding-bottom: 90px;
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
