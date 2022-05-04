<template>
  <div>
    <v-container class="fix--about--container">
      <!-- <v-card> -->
      <v-parallax src="img/kod.jpg" height="250" class="rounded-lg mb-3">
        <div class="wrapper">
          <div class="typing-demo mt-3 mb-3">It's revolution, Johnny!</div>
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

      <v-expansion-panels class="rounded-lg">
        <v-expansion-panel v-for="(item, i) in advantages" :key="i">
          <v-expansion-panel-header class="text-subtitle-2">
            {{ item.header }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
      <!-- <ul>
          <li>Актуальное расписание</li>
          <li>Возможность перехода в курс ПЕГАС</li>
          <li>Отображение текущего занятия в реальном времени</li>
          <li>Возможность установки на устройство (PWA)</li>
          <li>Избранное</li>
          <li>Поддержка групп, преподавателей и аудиторий</li>
         
        </ul> -->

      <!-- </v-card> -->
    </v-container>
  </div>
</template>

<script>
export default {
  name: "AboutPage",
  data: () => ({
    advantages: [
      {
        header: "Актуальное расписание",
        content: "",
      },
      {
        header: "Поддержка всех типов расписания",
        content:
          "В данный момент в Расписании реализована полная поддержка просмотра расписания для групп, преподавателей и аудиторий. Навигация возможна с помощью поиска или соответсвующих кнопок перехода в самом расписании",
      },
      {
        header: "Перехода в курс ПЕГАС",
        content:
          "В Расписание интегрирована возможность перехода в курсы дисциплин электронной системы НИУ БелГУ ПЕГАС. Их количество и наименование соответсвует таковому на официальном сайте университета",
      },
      {
        header: "Установка на любое устройство",
        content:
          "Расписание можно установить на любое устройство, поддерживающее технологию PWA. В рамках такой установки приложение появится на вашем главном экране и будет работать без окна браузера",
      },
      {
        header: "Избранное",
        content:
          "Возможность удобно переключаться между частопосещаемыми расписаниями может быть удобна для кураторов и работников университета. Избранное сохраняется в памяти устройства, поэтому нет необходимости каждый раз искать группу, преподавателя или аудиторию заново",
      },
      {
        header: "Отображение текущего занятия в реальном времени",
        content:
          "Теперь нет необходимости каждый раз обновлять страницу. Расписание самостоятельно перерисует интерфейс и покажет текущее занятие",
      },

      {
        header: "Автоматическое переключение на следующую неделю",
        content:
          "Думаете в воскресенье о новой неделе? Теперь нет необходимости каждый раз переключать неделю в воскресенье самостоятельно, Расписание переключит неделю самостоятельно и уведомит Вас об этом",
      },
      {
        header: "Прокрутка до текущего занятия",
        content:
          "По нажатию кнопки в нижнем правом углу Расписание прокрутит до текущего дня или занятия. Это очень удобно, ведь не нужно тратить время на поиски такового",
      },
    ],
  }),
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

.typing-demo {
  width: 24ch;
  animation: typing 4s steps(24), blink 0.5s step-end infinite alternate;
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
</style>
