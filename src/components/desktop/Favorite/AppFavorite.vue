<template>
  <v-card elevation="2">
    <v-card-title>
      <div>Избранное</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeFavorite">
        <v-icon>{{ editFavirite ? "mdi-check" : "mdi-pencil" }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text>
      <app-favorite-chip
        :edit="editFavirite"
        type="teacher"
        @remove-favorite-schedule="test"
        >Бурданова Е.В.</app-favorite-chip
      >

      <app-favorite-chip
        :edit="editFavirite"
        type="group"
        @remove-favorite-schedule="test"
        >12001902</app-favorite-chip
      >

      <app-favorite-chip
        :edit="editFavirite"
        type="location"
        @remove-favorite-schedule="test"
        >4-17, Учебный корпус №15</app-favorite-chip
      >
    </v-card-text>
  </v-card>
</template>

<script>
import AppFavoriteChip from "@/components/desktop/Favorite/AppFavoriteChip.vue";

export default {
  name: "appFavorite",
  methods: {
    changeFavorite() {
      this.editFavirite = !this.editFavirite;
    },
    test() {
      alert(123);
    },
  },
  data: () => ({
    editFavirite: false,
  }),
  components: {
    AppFavoriteChip,
  },
};
</script>

<style></style>
