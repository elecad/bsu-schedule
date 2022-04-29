<template>
  <v-card elevation="2" class="fix--favorite--height">
    <v-card-title class="pb-2 fix--favorite--title--height">
      <div>Избранное</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeFavorite" v-if="favorite.length != 0">
        <v-icon>{{ editFavirite ? "mdi-check" : "mdi-pencil" }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text class="favorite--card--fix pt-0">
      <div v-if="favorite.length != 0">
        <app-favorite-chip
          v-for="fav in favorite"
          :key="fav.id"
          :edit="editFavirite"
          :type="fav.type"
          :id="fav.id"
          >{{ fav.label }}</app-favorite-chip
        >
      </div>

      <div v-else class="d-flex flex-column align-center justify-content py-2">
        <div class="text--disabled subtitle-2">Здесь пока ничего нет...</div>
        <div class="text--disabled subtitle-2">Может, стоит добавить?</div>
      </div>
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
  },
  computed: {
    favorite() {
      return this.$store.getters.getFavorite;
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

.fix--favorite--title--height {
  height: 60px;
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
