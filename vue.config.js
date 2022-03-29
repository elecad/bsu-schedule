const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],
  // publicPath: "/test-build/", //! Менять при build сборке
});
