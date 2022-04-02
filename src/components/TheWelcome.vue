<template>
  <v-container>
    <v-expand-transition>
      <app-favorite class="mb-3" v-if="isFavorit"></app-favorite>

      ></v-expand-transition
    >

    <v-card class="mb-3">
      <v-card-title>
        <h3 class="div">Группа 12001902</h3>
        <v-spacer></v-spacer>
        <v-btn icon @click="isFavorit = !isFavorit">
          <v-icon>{{ isFavorit ? "mdi-star" : "mdi-star-outline" }}</v-icon>
        </v-btn>
      </v-card-title>
    </v-card>

    <v-card>
      <v-card-text>
        <v-row justify="center" class="my-1">
          <v-btn-toggle rounded>
            <v-btn>
              <v-icon>mdi-arrow-left</v-icon>
            </v-btn>
            <v-btn> Текущая неделя </v-btn>
            <v-btn>
              <v-icon>mdi-arrow-right</v-icon>
            </v-btn>
          </v-btn-toggle>
        </v-row>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import appFavorite from "@/components/Favorite/AppFavorite.vue";

export default {
  name: "WelcomePage",
  methods: {},
  components: { appFavorite },

  data: () => ({
    isFavorit: false,
  }),
  mounted() {},
};
</script>

<style lang="scss">
.theme--light.v-application {
  background-color: var(--v-background-base, #f5f5f5) !important;
}
</style>
