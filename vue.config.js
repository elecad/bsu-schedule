const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
    proxy: {
      "^/(bsu|schedule)": { target: "https://beluni.ru" },
    },
  },

  pwa: {
    name: "Расписание",
    themeColor: "#ffffff",
    msTileColor: "#ffffff",
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "light-content",
    workboxOptions: {
      exclude: [
        /\.map$/,
        /img\//,
        /fonts\//,
        /file\//,
        /favicon\.ico$/,
        /robots\.txt$/,
        /sitemap\.txt$/,
        /^manifest.*\.js?$/,
      ],
    },
    iconPaths: {
      appleTouchIcon: "img/icons/apple-touch-icon-180x180.png",
    },
    manifestOptions: {
      description: "Расписание занятий БелГУ",
      background_color: "#ffffff",
      display: "standalone",
      scope: "/",
      start_url: "/",
      icons: [
        {
          "src": "/img/icons/android-chrome-192x192.png",
          "sizes": "192x192",
          "type": "image/png",
          "purpose": "any",
        },
        {
          "src": "/img/icons/android-chrome-512x512.png",
          "sizes": "512x512",
          "type": "image/png",
          "purpose": "any",
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
