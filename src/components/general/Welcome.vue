<template>
  <div
    class="h-100 d-flex align-center justify-center flex-column text-center text--disabled"
  >
    <!-- <div class="text-h4">Добрый день! Впервые здесь?</div> -->
    <div v-if="isMobile" class="mobile--welcome">
      <div class="text-h4">Впервые здесь?</div>
      <div class="text-h6 mt-4 text-center">
        Воспользуйтесь <v-icon x-large>mdi-magnify</v-icon>
      </div>
    </div>
    <div v-else>
      <div class="text-h4">Впервые здесь?</div>
      <div v-if="!isMobile" class="text-h6 mt-4 text-center">
        Воспользуйтесь <v-icon x-large>mdi-magnify</v-icon> для нахождения
        расписания группы, преподавателя или аудитории
      </div>
    </div>

    <span class="text--disabled d-flex justify-center footer--welcome--page"
      >by &nbsp;<span class="text-decoration-underline">Anton Dakhin</span
      >&nbsp;2022</span
    >
  </div>
</template>

<script>
export default {
  name: "Welcome",
  data: () => ({
    isMobile: window.innerWidth > 959 ? false : true,
  }),
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
</style>
