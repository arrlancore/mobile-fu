const themeConfig = require("./src/config/themeConfig")
const { override, fixBabelImports, addLessLoader, addBabelPlugin, addBabelPresets } = require("customize-cra")
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer").BundleAnalyzerPlugin
const dev = process.env.NODE_ENV === 'development'
module.exports = override(
  addBabelPlugin(
    ["module-resolver", {
      "root": ["./src"],
      "alias": {
        "test": "./test"
      }
    }]
  ),
  addBabelPlugin("transform-react-remove-prop-types"),
  fixBabelImports("import", {
    libraryName: "antd",
    libraryDirectory: "es",
    style: true
  }),
  addLessLoader({
    javascriptEnabled: true,
    modifyVars: themeConfig
  }),
  addBabelPresets(["@babel/env", { modules: false }]),
  (config) => {
    if (!dev) {
      config.plugins.push(
        new BundleAnalyzerPlugin({
          analyzerMode: "static",
          reportFilename: "report.html",
        })
      )
    }
    return config
  }
)
