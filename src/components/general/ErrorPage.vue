<template>
  <div class="d-flex flex-column align-center justify-center error--fix">
    <div class="text-h5 mb-2 mt-15">Что-то пошло не так...</div>
    <div class="mb-5">
      <v-icon x-large>mdi-robot-dead-outline</v-icon>
    </div>
    <v-btn
      elevation="2"
      class="go--bsu--schedule"
      :href="link"
      target="_blank"
      >Расписание на сайте БелГУ</v-btn
    >
  </div>
</template>

<script>
export default {
  name: "ErrorPage",
  props: ['type', 'id'],
  computed: {
    link() {
      switch(this.type) {
        case 'group':
          return 'https://bsuedu.ru/bsu/education/schedule/groups/index.php?group='+this.id;
        case 'teacher':
          return 'https://bsuedu.ru/bsu/education/schedule/teachers/index.php?teacher='+this.id;
        case 'location':
          return 'https://bsuedu.ru/bsu/education/schedule/auditories/index.php?auditory='+this.id;
      };
    }
  }
};
</script>

<style scoped>
@media (max-width: 410px) {
  .go--bsu--schedule {
    font-size: 0.7rem !important;
  }
}
</style>
