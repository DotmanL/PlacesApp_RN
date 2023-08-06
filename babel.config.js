module.exports = function (api) {
  api.cache(true);
  return {
    presets: ["babel-preset-expo"],
    plugins: [
      [
        "module-resolver",
        {
          root: ["./src"],
          alias: {
            components: "./src/components",
            screens: "./src/screens",
            interfaces: "./src/interfaces",
            constants: "./src/constants",
            util: "./src/util",
            store: "./src/store"
          }
        }
      ],
      [
        "module:react-native-dotenv",
        {
          moduleName: "@env",
          path: ".env",
          safe: false,
          allowUndefined: true,
          blocklist: null,
          allowlist: null,
          verbose: false
        }
      ]
    ]
  };
};
