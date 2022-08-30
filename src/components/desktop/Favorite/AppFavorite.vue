<template>
  <v-card elevation="2" class="fix--favorite--height mb-5">
    <v-card-title class="pb-2 fix--favorite--title--height">
      <div>Избранное</div>
      <v-spacer></v-spacer>
      <v-btn icon @click="changeFavorite" v-if="favorite.length != 0">
        <v-icon>{{ editFavirite ? "mdi-check" : "mdi-pencil" }}</v-icon>
      </v-btn>
    </v-card-title>

    <v-card-text
      class="favorite--card--fix pt-0"
      :class="{
        'favorite--lignt--scroll': !theme,
        'favorite--dark--scroll': theme,
      }"
    >
      <v-fade-transition leave-absolute>
        <transition-group name="fade-transition" v-if="favorite.length != 0">
          <app-favorite-chip
            v-for="fav in favorite"
            :key="fav.id"
            :edit="editFavirite"
            :type="fav.type"
            :id="fav.id"
            class="favorite--chip"
            >{{ fav.label }}</app-favorite-chip
          >
        </transition-group>

        <div
          v-if="favorite.length == 0"
          class="d-flex flex-column align-center justify-content py-2"
        >
          <div class="text--disabled subtitle-2">Здесь пока ничего нет...</div>
        </div>
      </v-fade-transition>
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
  },
  watch: {
    favorite(newVal) {
      if (newVal.length == 0) {
        this.editFavirite = false;
      }
    },
  },
  computed: {
    favorite() {
      return this.$store.getters.getFavorite;
    },
    theme() {
      return this.$vuetify.theme.dark;
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

<style scoped>
.favorite--card--fix {
  overflow: hidden;

  min-height: 56px;
}

.fix--favorite--title--height {
  height: 60px;
}

/* .favorite--card--fix::-webkit-scrollbar {
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
} */

.favorite--lignt--scroll::-webkit-scrollbar {
  width: 5px;
  background-color: #f9f9fd;
}

.favorite--lignt--scroll::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #cccccc;
}

.favorite--lignt--scroll::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: white;
}

.favorite--dark--scroll::-webkit-scrollbar {
  width: 5px;

  background-color: #121212;
}

.favorite--dark--scroll::-webkit-scrollbar-thumb {
  border-radius: 5px;
  background-color: #757575;
}

.favorite--dark--scroll::-webkit-scrollbar-track {
  border-radius: 5px;
  background-color: #121212;
}

.fix--padding--favorite {
  margin-bottom: 100px;
}
</style>
