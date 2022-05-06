const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
    proxy: {
      "^/bsu": { target: "https://beluni.ru" },
    },
  },

  pwa: {
    name: "Расписание",
    themeColor: null,
    msTileColor: "#ffffff",
    manifestOptions: {
      background_color: "#ffffff",
      theme_color: "#f5f5f5",
      display: "standalone",
      start_url: "/",
      icons: [
        {
          "src": "/img/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
        },
        {
          "src": "/img/icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
        },
        {
          "src": "/img/icons/android-chrome-maskable-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "maskable",
        },
        {
          "src": "/img/icons/android-chrome-maskable-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "maskable",
        },
      ],
    },
  },
});
