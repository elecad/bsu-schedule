<template>
  <div
    class="h-100 d-flex align-center justify-space-between flex-column text-center"
  >
    <div class="d-flex flex-column text-center justify-center fill-height">
      <div class="text-h4">Добрый день! Вы тут в первый раз?</div>
      <div class="text-h6 mt-4 text-center">
        Воспользуйтесь <v-icon x-large>mdi-magnify</v-icon> для нахождения
        расписания группы, преподавателя или аудитории
      </div>
    </div>

    <span class="text--disabled d-flex justify-center"
      >by &nbsp;<span class="text-decoration-underline">Anton Dakhin</span
      >&nbsp;2022</span
    >
  </div>
</template>

<script>
export default {
  name: "Welcome",
};
</script>

<style scoped>
.h-100 {
  height: 90vh;
}
</style>
