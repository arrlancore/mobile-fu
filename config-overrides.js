const themeConfig = require("./src/config/themeConfig");

const { override, fixBabelImports, addLessLoader, addBabelPlugin } = require("customize-cra");

module.exports = override(
  addBabelPlugin(
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test"
      }
    }]
  ),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeConfig
  })
);
