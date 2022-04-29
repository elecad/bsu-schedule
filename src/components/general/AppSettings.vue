<template>
  <v-dialog
    v-model="value"
    @click:outside="$emit('input', false)"
    scrollable
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h5"> Настройки </v-card-title>

      <v-divider class="mb-3"></v-divider>

      <v-card-text class="text--primary">
        <div class="d-flex justify-space-between align-center">
          <div class="text-subtitle-1">Тема приложения:</div>
          <v-btn-toggle borderless v-model="theme">
            <v-btn>
              <v-icon>mdi-weather-sunny</v-icon>
            </v-btn>

            <v-btn>
              <v-icon>mdi-weather-night</v-icon>
            </v-btn>
          </v-btn-toggle>
        </div>

        <div class="d-flex justify-space-between align-start mt-4">
          <div class="">
            <div class="text-subtitle-1">Автоматическое переключение:</div>
            <div class="text-caption text--secondary">
              В Воскресенье рапсисание автоматически переключит неделю на
              следующую
            </div>
          </div>

          <div class="pl-5 py-2">
            <v-switch
              hide-details
              inset
              color="indigo"
              v-model="autoNextWeek"
            ></v-switch>
          </div>
        </div>

        <div class="d-flex justify-space-between align-start mt-4">
          <div class="">
            <div class="text-subtitle-1">Отключение анимации на ПК:</div>
            <div class="text-caption text--secondary">
              Если у вас слабое устройство, воспользуетесь этой настройкой для
              увеличения производительности приложения
            </div>
          </div>

          <div class="pl-5 py-2">
            <v-switch
              hide-details
              inset
              color="indigo"
              v-model="weakDesktop"
            ></v-switch>
          </div>
        </div>

        <div class="d-flex justify-space-between align-start mt-4">
          <div class="">
            <div class="text-subtitle-1">
              Упрощённая версия для мобильных устройств:
            </div>
            <div class="text-caption text--secondary">
              Если у вас слабое мобильное устройство, воспользуетесь этой
              настройкой для увеличения производительности приложения
            </div>
          </div>
          <div class="pl-5 py-2">
            <v-switch
              hide-details
              inset
              color="indigo"
              v-model="weakMobile"
            ></v-switch>
          </div>
        </div>

        <v-container fluid class="py-0 px-0 pt-6">
          <v-btn color="primary" class="fix--width--about--button">
            О проекте
          </v-btn>
        </v-container>
      </v-card-text>

      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="indigo" text @click="$emit('input', false)">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Settings",
  computed: {
    settings() {
      return this.$store.getters.getSettings;
    },
  },
  watch: {
    theme(newVal) {
      this.$store.commit("dark", newVal ? true : false);
    },
    autoNextWeek(newVal) {
      this.$store.commit("autoNextWeek", newVal);
    },
    weakDesktop(newVal) {
      this.$store.commit("weakDesktop", newVal);
    },
    weakMobile(newVal) {
      this.$store.commit("weakMobile", newVal);
    },
  },
  props: {
    value: Boolean,
  },
  data: () => ({
    theme: 0,
    autoNextWeek: false,
    weakDesktop: false,
    weakMobile: false,
  }),
  created() {
    this.theme = this.$store.getters.getSettings.dark ? 1 : 0;
    this.autoNextWeek = this.$store.getters.getSettings.autoNextWeek;
    this.weakDesktop = this.$store.getters.getSettings.weakDesktop;
    this.weakMobile = this.$store.getters.getSettings.weakMobile;
  },
};
</script>

<style scoped>
.v-input--switch {
  margin: 0px;
  padding: 0px;
}

.fix--width--about--button {
  width: 100%;
}

@media (max-width: 320px) {
  * >>> .v-dialog.v-dialog--active {
    margin-left: 3px !important;
    margin-right: 3px !important;
  }
}
</style>
