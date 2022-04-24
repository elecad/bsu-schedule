<template>
  <v-card elevation="2" class="fix--favorite--height">
    <v-card-title class="pb-2">
      <div>Избранное</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeFavorite">
        <v-icon>{{ editFavirite ? "mdi-check" : "mdi-pencil" }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="favorite--card--fix pt-0">
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

import simplebar from "simplebar-vue";
import "simplebar/dist/simplebar.min.css";

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
    simplebar,
  },
};
</script>

<style scoped>
.favorite--card--fix {
  overflow: auto;
  max-height: calc(100vh - 650px) !important;
}

.favorite--card--fix::-webkit-scrollbar {
  width: 5px;
  background-color: #f9f9fd;
}

.favorite--card--fix::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #cccccc;
}

.favorite--card--fix::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: white;
}
</style>
