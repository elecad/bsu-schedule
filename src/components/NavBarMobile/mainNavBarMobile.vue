<template>
  <v-app-bar class="navbar-mobile--main" height="60px">
    <v-icon class="mr-1">mdi-school-outline</v-icon>
    <v-toolbar-title>Расписание</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="$emit('search-open-mobile')">
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
    <v-btn icon @click="$emit('search-close-mobile')">
      <v-icon>mdi-cog</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "mainNavBarMobile",
};
</script>

<style></style>
