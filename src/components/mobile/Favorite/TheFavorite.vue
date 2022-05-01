<template>
  <v-container fluid class="px-3 py-4 fix--padding--favorite">
    <div class="text-h5 font-weight-medium mb-5">Избранное</div>
    <div class="fix--padding--cupertino">
      <div v-if="favorite.length != 0">
        <v-scale-transition v-for="fav in favorite" :key="fav.id">
          <app-favorite-chip
            :edit="editFavirite"
            :type="fav.type"
            :id="fav.id"
            @close--bottom--sheet="$emit('close--bottom--sheet')"
            >{{ fav.label }}</app-favorite-chip
          >
        </v-scale-transition>
      </div>
      <div v-else class="d-flex flex-column align-center justify-content">
        <div class="text--disabled subtitle-1">Здесь пока ничего нет...</div>
      </div>
    </div>

    <v-btn
      class="mx-2 elevation-0 fix--edit--favorite--button--position"
      fab
      dark
      color="indigo"
      @click="editFavirite = !editFavirite"
      v-if="favorite.length != 0"
    >
      <v-icon dark>
        {{ editFavirite ? "mdi-check" : "mdi-pencil" }}
      </v-icon>
    </v-btn>
  </v-container>
</template>

<script>
import appFavoriteChip from "@/components/mobile/Favorite/AppFavoriteChip.vue";

export default {
  name: "faviriteMobile",
  components: { appFavoriteChip },
  props: { isOpen: Boolean },
  watch: {
    isOpen(newVal) {
      if (!newVal) this.editFavirite = false;
    },
  },
  data: () => ({
    editFavirite: false,
  }),
  methods: {},
  computed: {
    favorite() {
      return this.$store.getters.getFavorite;
    },
  },
};
</script>

<style scoped>
.fix--edit--favorite--button--position {
  position: absolute;
  right: 10px;
  bottom: 15px;
}

.fix--padding--favorite {
  padding-bottom: 150px !important;
}
</style>
