<template>
  <div class="d-flex fill-height justify-center align-center flex-column">
    <div class="text--404 text-h1">404</div>
    <div class="text-button mb-10 text-center">
      Хм... Похоже что-то пошло не так
    </div>
    <v-btn elevation="2" @click="$router.push({ name: 'main' })"
      >Вернуться к расписанию</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style scoped>
.text--404 {
  font-size: 8rem !important;
  color: #bdbdbd;
  padding-bottom: 5px;
}
</style>
