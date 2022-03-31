const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  devServer: {
    allowedHosts: "all",
    client: {
      webSocketURL: "auto://0.0.0.0:0/ws",
    },
  },
  // devServer: {
  //   allowedHosts: "all",
  //   client: {
  //     webSocketURL: "auto://0.0.0.0:8081/ws",
  //   },
  // },
  publicPath: process.env.NODE_ENV === "production" ? "/test-build/" : "/",
});
