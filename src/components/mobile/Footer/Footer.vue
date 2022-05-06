<template>
  <v-scroll-y-transition>
    <span
      class="text--disabled d-flex justify-center text--pointer"
      v-if="!loading"
      >by &nbsp;
      <router-link :to="{ name: 'about' }" custom v-slot="{ navigate }"
        ><span class="text-decoration-underline" @click="navigate"
          >Anton Dakhin</span
        ></router-link
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

<style>
.text--pointer {
  cursor: pointer;
}
</style>
