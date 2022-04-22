<template>
  <v-scroll-y-transition>
    <span class="text--disabled d-flex justify-center" v-if="!loading"
      >by &nbsp;<span class="text-decoration-underline">Anton Dakhin</span
      >&nbsp;2022</span
    >
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "FooterMobile",
  props: {
    loading: Boolean,
  },
};
</script>

<style></style>
