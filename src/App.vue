<template>
  <v-app>
    <nav-bar></nav-bar>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import navBar from "@/components/ThisNavbar";

export default {
  name: "App",

  components: { navBar },
  data: () => ({}),
};
</script>
