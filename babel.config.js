module.exports = {
  presets: ["babel-preset-expo"],
  // presets: ["module:metro-react-native-babel-preset"],
  plugins: [
    [
      "module:react-native-dotenv",
      {
        moduleName: "@env",
        path: ".env",
        safe: true,
      },
      "react-native-reanimated/plugin",
    ],
    [
      "module-resolver",
      {
        root: ["./src"], // Specify the root folder
        alias: {
          // Define aliases
          "~": "./src",
          // Add other folders as needed
        },
        extensions: [
          ".js",
          ".jsx",
          ".ts",
          ".tsx",
          ".android.js",
          ".android.tsx",
          ".ios.js",
          ".ios.tsx",
        ],
      },
    ],
  ],
};
