module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          alias: {
            components: "./src/components",
            screens: "./src/screens",
            interfaces: "./src/interfaces",
            constants: "./src/constants",
            util: "./src/util",
            store: "./src/store"
          }
        }
      ]
    ]
  };
};
