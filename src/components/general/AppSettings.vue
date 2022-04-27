<template>
  <v-dialog
    v-model="openSetting"
    @click:outside="$emit('close--settings')"
    scrollable
    max-width="500px"
  >
    <v-card>
      <v-card-title class="text-h5"> Настройки </v-card-title>

      <v-divider class="mb-3"></v-divider>

      <v-card-text class="text--primary">
        <div class="d-flex justify-space-between align-center">
          <div class="text-subtitle-1">Тема приложения:</div>
          <v-btn-toggle borderless>
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
            <v-switch hide-details inset color="indigo"></v-switch>
          </div>
        </div>
        <div class="hidden-sm-and-down">
          <div class="d-flex justify-space-between align-start mt-4">
            <div class="">
              <div class="text-subtitle-1">Отключение анимации на ПК:</div>
              <div class="text-caption text--secondary">
                Если у вас слабое устройство, воспользуетесь этой настройкой для
                увеличения производительности приложения
              </div>
            </div>
            <div class="pl-5 py-2">
              <v-switch hide-details inset color="indigo"></v-switch>
            </div>
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
        <v-btn color="indigo" text @click="$emit('close--settings')">
          Закрыть
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  name: "Settings",
  props: {
    openSetting: Boolean,
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
</style>
