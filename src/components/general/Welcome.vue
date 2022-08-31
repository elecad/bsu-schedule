<template>
  <div
    class="h-100 d-flex align-center justify-center flex-column text-center text--disabled"
  >
    <!-- <div class="text-h4">Добрый день! Впервые здесь?</div> -->
    <div v-if="isMobile" class="mobile--welcome">
      <div class="text-h4">Впервые здесь?</div>
      <div class="text-h6 mt-2 text-center">
        Воспользуйтесь
        <v-btn icon @click="openSearch"
          ><v-icon x-large>mdi-magnify</v-icon></v-btn
        >
      </div>
      <div class="text-body-2 mt-11 mx-4" style="max-width: 250px">
        Введите в поиске группу, преподавателя или аудиторию
      </div>
    </div>
    <div v-else>
      <div class="text-h4">Впервые здесь?</div>
      <div v-if="!isMobile" class="text-h6 mt-4 text-center">
        Воспользуйтесь <v-icon x-large>mdi-magnify</v-icon> для нахождения
        расписания группы, преподавателя или аудитории
      </div>
    </div>

    <span
      v-if="!isSearch"
      class="text--disabled d-flex justify-center footer--welcome--page"
      >by &nbsp;
      <router-link :to="{ name: 'about' }" custom v-slot="{ navigate }"
        ><span class="text-decoration-underline" @click="navigate"
          >Anton Dakhin</span
        ></router-link
      >
      &nbsp;2022</span
    >
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({
    isMobile: window.innerWidth > 959 ? false : true,
  }),
  methods: {
    openSearch() {
      this.$store.commit("setMobileSearch", true);
    },
  },
  computed: {
    isSearch() {
      return this.$store.getters.getMobileSearch;
    },
  },
};
</script>

<style scoped>
.h-100 {
  height: 90vh;
}
.footer--welcome--page {
  position: fixed;
  bottom: 15px;
  cursor: pointer;
}

.mobile--welcome {
  position: absolute;
  top: 35%;
}

.help--text {
  position: fixed;
  top: 60%;
}

@media (max-height: 400px) {
  .footer--welcome--page {
    display: none !important;
  }
}
</style>
