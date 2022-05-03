<template>
  <v-scroll-y-transition leave-absolute>
    <div>
      <div class="d-flex flex-column align-center justify-center error--fix">
        <div class="text-h5 mb-2 mt-15">Что-то пошло не так...</div>
        <div class="mb-5">
          <v-icon x-large>mdi-robot-dead-outline</v-icon>
        </div>
        <v-btn
          elevation="2"
          class="go--bsu--schedule"
          href="https://bsuedu.ru/bsu/education/schedule/"
          target="_blank"
          >Расписание на сайте БелГУ</v-btn
        >
      </div>
    </div>
  </v-scroll-y-transition>
</template>

<script>
export default {
  name: "ErrorPage",
};
</script>

<style scoped>
@media (max-width: 410px) {
  .go--bsu--schedule {
    font-size: 0.7rem !important;
  }
}
</style>
