<template>
  <v-chip
    :color="colors[type]"
    text-color="white"
    class="ma-1 fix--width--chip"
  >
    <v-avatar left>
      <v-icon>{{ `mdi-${icons[type]}` }}</v-icon>
    </v-avatar>
    <slot></slot>
    <v-scale-transition origin="center">
      <v-icon
        right
        size="18"
        v-if="edit"
        @click="$emit('remove--favorite--schedule')"
        >$delete</v-icon
      >
    </v-scale-transition>

    <v-expand-x-transition>
      <div style="width: 18px; margin-right: -18px" v-if="edit"></div>
    </v-expand-x-transition>
  </v-chip>
</template>

<script>
export default {
  name: "AppFavoriteChip",
  props: {
    type: String,
    edit: Boolean,
    id: Number | String,
  },
  data: () => ({
    colors: {
      group: "purple darken-1",
      location: "light-blue darken-1",
      teacher: "teal darken-1",
    },
    icons: {
      group: "account-multiple",
      location: "office-building",
      teacher: "account-circle",
    },
  }),
  methods: {},
};
</script>

<style></style>
