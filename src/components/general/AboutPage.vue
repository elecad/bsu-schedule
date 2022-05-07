<template>
  <div>
    <v-parallax src="img/kod.jpg" height="250" class="mb-3">
      <div class="wrapper">
        <div class="typing-demo-one mt-3 mb-3">It's revolution, Johnny!</div>
      </div>

      <div class="d-flex justify-center align-center flex-column">
        <v-img
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
      <!-- <v-card> -->

      <v-expansion-panels class="rounded-lg mb-3">
        <v-expansion-panel v-for="(item, i) in advantages" :key="i">
          <v-expansion-panel-header class="text-subtitle-1 font-weight-medium">
            {{ item.header }}
          </v-expansion-panel-header>
          <v-expansion-panel-content class="text-body-1 px-3">
            {{ item.content }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>

      <v-card class="mb-3 elevation-2" dark color="indigo">
        <v-card-title class="py-1 justify-center">Автор проекта</v-card-title>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3">
          <v-img src="/img/author.jpg"></v-img>
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
          <v-btn
            color="#0077FF"
            disabled
            href="https://github.com/serfreeman1337"
            target="_blank"
          >
            Нет данных
          </v-btn>
        </div>
      </v-card>

      <v-card
        class="rounded-lg d-flex justify-space-around flex-column align-center mb-3"
      >
        <v-avatar size="150" class="ma-3">
          <v-img src="/img/thanks2.jpg"></v-img>
        </v-avatar>
        <div class="text-h5">Vitaly Taran</div>
        <div class="text-caption text-center mt-3">
          <div>Помощь с размещением</div>
          <div>Тестирование</div>
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
          <v-img src="/img/thanks3.jpg"></v-img>
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
          <div class="typing-demo-two mt-3 mb-3">Приятного пользования!</div>
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
          "Расписание можно установить на любое устройство, поддерживающее технологию PWA. В рамках такой установки приложение появится на вашем главном экране и будет работать без окна браузера. Это очень удобно, ведь проподает необходимость каждый раз заходить на сайт самостоятельно!",
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
  }),

  methods: {
    startScroll() {
      document.body.style.overscrollBehaviorY = "auto";
      document.querySelector("html").style.overflow = "auto";
    },
    scrollUp() {
      window.scrollTo({ top: 0, behavior: "auto" });
    },
  },

  created() {
    this.startScroll();
    this.scrollUp();
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
</style>
