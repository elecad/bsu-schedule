<template>
  <div>
    <v-parallax src="img/kod.jpg" height="250" class="mb-3">
      <div class="wrapper">
        <div class="typing-demo-one mt-3 mb-3">It's revolution, Johnny!</div>
      </div>

      <div class="d-flex justify-center align-center flex-column">
        <v-img
          eager
          src="img/icon.png"
          width="25%"
          max-width="100px"
          alt="Расписание"
          class="elevation-5 rounded-circle"
        ></v-img>
        <div class="text-h6 mt-2">Расписание</div>
      </div></v-parallax
    >
    <v-container class="fix--about--container">
      <v-expansion-panels class="rounded-lg mb-3">
        <v-expansion-panel v-for="(item, i) in advantages" :key="i">
          <v-expansion-panel-header class="text-subtitle-1 font-weight-medium">
            {{ item.header }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-body-1 px-3">
            {{ item.content }}
          </v-expansion-panel-content>
        </v-expansion-panel>

        <v-expansion-panel>
          <v-expansion-panel-header class="text-subtitle-1 font-weight-medium">
            Наличие собственного Telegram-бота
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-body-1 px-3">
            <div>
              Теперь имеется возможность посмотреть Расписание с помощью
              современного Telegram-бота. Бот
              <a href="http://t.me/bsuedubot" class="text-decoration-none"
                >@bsuedubot</a
              >
              имеет полную поддержку всех видов расписаний!
            </div>
            <div class="d-flex justify-center mt-3">
              <v-btn
                color="indigo"
                dark
                href="https://vk.com/a_d_elec"
                target="_blank"
              >
                Перейти к боту
              </v-btn>
            </div>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card class="mb-3">
        <v-toolbar color="indigo" dark flat>
          <v-toolbar-title>Как установить?</v-toolbar-title>

          <template v-slot:extension>
            <v-tabs v-model="model" fixed-tabs slider-color="indigo lighten-4">
              <v-tab href="#tab-1">Android</v-tab>
              <v-tab href="#tab-2">IOS</v-tab>
              <v-tab href="#tab-3">ПК</v-tab>
            </v-tabs>
          </template>
        </v-toolbar>

        <v-tabs-items v-model="model" :touchless="false">
          <v-tab-item value="tab-1">
            <v-stepper v-model="android" vertical>
              <v-stepper-step :complete="android > 1" step="1">
                Скачайте приложение "Расписание" на своё устройство
              </v-stepper-step>

              <v-stepper-content step="1">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/icon.png"
                    eager
                    width="40%"
                    max-width="150"
                    alt="Расписание"
                    class="elevation-5 rounded-circle my-4"
                  ></v-img>
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    :href="`/file/${getNameAPK}`"
                  >
                    Скачать
                  </v-btn>
                </div>
                <v-btn color="primary" @click="android = 2"> Далее </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="android > 2" step="2">
                Выполните установку
              </v-stepper-step>

              <v-stepper-content step="2">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    eager
                    src="img/android-step-2.jpg"
                    width="40%"
                    min-width="150"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="android = 3"> Далее </v-btn>
                <v-btn text @click="android = android - 1" class="ml-2">
                  Назад
                </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="android > 3" step="3">
                Теперь приложение доступно на рабочем столе
              </v-stepper-step>

              <v-stepper-content step="3">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/android-step-3.jpg"
                    width="20%"
                    eager
                    min-width="150"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="android = 1"> В начало </v-btn>
                <v-btn text @click="android = android - 1" class="ml-2">
                  Назад
                </v-btn>
              </v-stepper-content>
            </v-stepper>
          </v-tab-item>

          <v-tab-item value="tab-2"
            ><v-stepper v-model="ios" vertical>
              <v-stepper-step :complete="ios > 1" step="1">
                Откройте главную страницу "Расписание" в Safari
              </v-stepper-step>

              <v-stepper-content step="1">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    href="/"
                    target="_blank"
                  >
                    beluni.ru
                  </v-btn>
                </div>
                <v-btn color="primary" @click="ios = 2"> Далее </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="ios > 2" step="2">
                Перейдите в полную версию браузера
              </v-stepper-step>

              <v-stepper-content step="2">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    eager
                    src="img/ios-step-1.jpg"
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="ios = 3"> Далее </v-btn>
                <v-btn text @click="ios = ios - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="ios > 3" step="3">
                Нажмите "Поделиться"
              </v-stepper-step>

              <v-stepper-content step="3">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    eager
                    src="img/ios-step-2.jpg"
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="ios = 4"> Далее </v-btn>
                <v-btn text @click="ios = ios - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="ios > 4" step="4">
                Нажмите "На экран Домой"
              </v-stepper-step>

              <v-stepper-content step="4">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/ios-step-3.jpg"
                    eager
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="ios = 5"> Далее </v-btn>
                <v-btn text @click="ios = ios - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="ios > 5" step="5">
                Добавьте приложение на рабочий стол
              </v-stepper-step>

              <v-stepper-content step="5">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/ios-step-4.jpg"
                    eager
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="ios = 6"> Далее </v-btn>
                <v-btn text @click="ios = ios - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step step="6">
                Теперь приложение появилось на главном экране
              </v-stepper-step>

              <v-stepper-content step="6">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/ios-step-5.jpg"
                    eager
                    width="40%"
                    min-width="130"
                    max-width="200"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="ios = 1"> В начало </v-btn>
                <v-btn text @click="ios = ios - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>
            </v-stepper></v-tab-item
          >

          <v-tab-item value="tab-3"
            ><v-stepper v-model="pc" vertical>
              <v-stepper-step :complete="pc > 1" step="1">
                Откройте главную страницу "Расписание" в браузере
              </v-stepper-step>

              <v-stepper-content step="1">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-btn
                    color="indigo"
                    dark
                    class="my-2"
                    href="/"
                    target="_blank"
                  >
                    beluni.ru
                  </v-btn>
                </div>
                <v-btn color="primary" @click="pc = 2"> Далее </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="pc > 2" step="2">
                Нажмите "Установить"
              </v-stepper-step>

              <v-stepper-content step="2">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    eager
                    src="img/pc-step-2.jpg"
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="pc = 3"> Далее </v-btn>
                <v-btn text @click="pc = pc - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="pc > 3" step="3">
                Установите приложение
              </v-stepper-step>

              <v-stepper-content step="3">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/pc-step-3.jpg"
                    eager
                    width="40%"
                    min-width="210"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="pc = 4"> Далее </v-btn>
                <v-btn text @click="pc = pc - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>

              <v-stepper-step :complete="pc > 4" step="4">
                Теперь приложение доступно на рабочем столе
              </v-stepper-step>

              <v-stepper-content step="4">
                <div
                  class="mb-6 d-flex align-center justify-center flex-column"
                  elevation="0"
                >
                  <v-img
                    src="img/pc-step-4.jpg"
                    eager
                    width="40%"
                    min-width="150"
                    max-width="200"
                    alt="Расписание"
                    class="elevation-5 my-2"
                  ></v-img>
                </div>
                <v-btn color="primary" @click="pc = 1"> В начало </v-btn>
                <v-btn text @click="pc = pc - 1" class="ml-2"> Назад </v-btn>
              </v-stepper-content>
            </v-stepper></v-tab-item
          >
        </v-tabs-items>
      </v-card>

      <v-card class="mb-3 elevation-2" dark color="indigo">
        <v-card-title class="py-1 justify-center">Автор проекта</v-card-title>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3">
          <v-img src="/img/author.jpg" eager></v-img>
        </v-avatar>
        <div class="text-h5">Антон Дахин</div>

        <div class="my-4">
          <v-btn
            color="#0077FF"
            dark
            href="https://vk.com/a_d_elec"
            target="_blank"
          >
            VK
          </v-btn>
        </div>
      </v-card>

      <v-card class="mb-3 elevation-2" dark color="indigo">
        <v-card-title class="py-1 justify-center"
          >Отдельное спасибо</v-card-title
        >
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3" id="1337">
          <div
            class="grey lighten-2 undefined--fix d-flex align-center justify-center"
          >
            <v-progress-circular
              indeterminate
              color="indigo"
            ></v-progress-circular>
          </div>
        </v-avatar>
        <div class="text-h5">undefined</div>
        <div class="text-caption text-center mt-3">
          <div>Помощь с кодом</div>
          <div>Тестирование</div>
          <div>Умный proxy</div>
          <div>Быстрый фидбек</div>
        </div>
        <div class="my-4">
          <v-btn color="#0077FF" disabled href="1337" target="_blank">
            Нет данных
          </v-btn>
        </div>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3">
          <v-img src="/img/thanks2.jpg" eager></v-img>
        </v-avatar>
        <div class="text-h5">Vitaly Taran</div>
        <div class="text-caption text-center mt-3">
          <div>Помощь с размещением</div>
          <div>Тестирование</div>
          <div>Создание Telegram-бота</div>
        </div>
        <div class="my-4">
          <v-btn
            color="#0077FF"
            dark
            href="https://vk.com/vooforx"
            target="_blank"
          >
            VK
          </v-btn>
        </div>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3">
          <v-img src="/img/thanks3.jpg" eager></v-img>
        </v-avatar>
        <div class="text-h5">Мария Ходячих</div>
        <div class="text-caption text-center mt-3">
          <div>Создание иконки</div>
          <div>Создание информационных картинок</div>
          <div>Тестирование</div>
        </div>
        <div class="my-4">
          <v-btn
            color="#0077FF"
            dark
            href="https://vk.com/m_h_411"
            target="_blank"
          >
            VK
          </v-btn>
        </div>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3 pa-7"
      >
        <div class="text-h6 text-center">
          И всем тем, кто помогал c тестированием приложения на различных
          устройствах!
        </div>
      </v-card>
    </v-container>

    <v-parallax src="img/kod.jpg" height="200">
      <v-lazy>
        <div class="wrapper">
          <div class="typing-demo-two mt-3 mb-3">Приятного использования!</div>
        </div>
      </v-lazy>
      <div class="wrapper">
        <div class="my-4">
          <router-link
            :to="{ name: 'main' }"
            custom
            v-slot="{ navigate, href }"
          >
            <v-btn elevation="2" :href="href" @click="navigate"
              >К расписанию</v-btn
            >
          </router-link>
        </div>
      </div></v-parallax
    >
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data: () => ({
    advantages: [
      {
        header: "Актуальное расписание",
        content:
          "Первоисточником расписания является официальный сайт НИУ БелГУ. По этой причине расписание всегда будет актуальным!",
      },
      {
        header: "Поддержка всех типов расписания",
        content:
          "Расписание имеет полную поддержку расписаний групп, преподавателей и аудиторий. Навигация возможна с помощью поиска или кнопок перехода.",
      },
      {
        header: "Переход в курс ПЕГАС",
        content:
          "В Расписание интегрирована возможность перехода в курсы дисциплин электронной системы НИУ БелГУ ПЕГАС. Поддерживается система множественных курсов ПЕГАС: их количество не отличается от количества на официальном сайте НИУ БелГУ.",
      },
      {
        header: "Установка на любое устройство",
        content:
          "Расписание можно установить на любое устройство, поддерживающее технологию PWA. В рамках такой установки приложение появится на вашем главном экране и будет работать без окна браузера. Это очень удобно, ведь пропадает необходимость каждый раз заходить на сайт самостоятельно!",
      },
      {
        header: "Избранное",
        content:
          "Возможность удобно переключаться между частопосещаемыми группами / преподавателями / аудиториями может быть удобна для кураторов и работников университета. Избранное сохраняется в памяти устройства, поэтому не нужно каждый раз искать группу, преподавателя или аудиторию самостоятельно.",
      },
      {
        header: "Адаптивный интерфейс",
        content:
          "Расписание сохраняет особенности интерфейса для различных платформ. Такой подход - гарант удобства пользователя.",
      },
      {
        header: "Отображение текущего занятия в реальном времени",
        content:
          "Теперь нет необходимости каждый раз обновлять страницу! Расписание самостоятельно перерисует интерфейс и покажет текущее занятие.",
      },

      {
        header: "Автоматическое переключение на следующую неделю",
        content:
          "Думаете в воскресенье о новой неделе? Расписание автоматически переключится на следующую неделю в этот день! Эту функцию можно отключить в настройках.",
      },
      {
        header: "Прокрутка до текущего занятия",
        content:
          "По нажатию кнопки в нижнем правом углу «Расписание» прокрутит страницу до текущего дня или занятия. Это очень удобно, ведь не нужно тратить время на поиски занятий!",
      },
    ],
    model: "tab-1",
    android: 1,
    ios: 1,
    pc: 1,
    isAndroid: /(android)/i.test(navigator.userAgent),
    isIphone: /iPhone|iPod|iPad/.test(navigator.userAgent),
  }),

  computed: {
    getNameAPK() {
      return !/(android [0-7]\.)/i.test(navigator.userAgent)
        ? "Schedule.apk"
        : "Schedule-v7.apk";
    },
  },

  methods: {
    startScroll() {
      document.body.style.overscrollBehaviorY = "auto";
      document.querySelector("html").style.overflow = "auto";
    },
    scrollUp() {
      window.scrollTo({ top: 0, behavior: "auto" });
    },
    selectPlatform() {
      if (this.isAndroid) return "tab-1";
      if (this.isIphone) return "tab-2";
      return "tab-3";
    },
  },

  created() {
    this.startScroll();
    this.scrollUp();
    this.model = this.selectPlatform();
  },
};
</script>

<style scoped>
.fix--about--container {
  max-width: 1000px;
}

.wrapper {
  /* height: 100vh; */
  /*This part is important for centering*/
  display: flex;
  align-items: center;
  justify-content: center;
  box-sizing: border-box !important;
  /* font-size: 10px; */
}

@media (max-width: 480px) {
  .wrapper {
    font-size: 10px;
  }
}

@media (max-width: 310px) {
  .wrapper {
    font-size: 8px;
  }
}

.typing-demo-one {
  width: 24ch;
  animation: typing 3s steps(24), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid;
  font-family: monospace;
  font-size: 2em;
}

.typing-demo-two {
  width: 22ch;
  animation: typing 2s steps(22), blink 0.5s step-end infinite alternate;
  white-space: nowrap;
  overflow: hidden;
  border-right: 1px solid;
  font-family: monospace;
  font-size: 2em;
}

@keyframes typing {
  from {
    width: 0;
  }
}

@keyframes blink {
  50% {
    border-color: transparent;
  }
}

.undefined--fix {
  width: 100%;
  height: 100%;
}

@media (max-width: 300px) {
  * >>> .v-btn__content {
    font-size: 11px !important;
  }
}
</style>
