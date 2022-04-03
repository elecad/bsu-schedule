const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
    proxy: {
      "^/bsu": { target: "http://echo.uz" },
    },
  },

  pwa: {
    name: "#Расписание",
    themeColor: "#ffffff",
    msTileColor: "#000000",
  },

  publicPath: process.env.NODE_ENV === "production" ? "/test-build/" : "/",
});
