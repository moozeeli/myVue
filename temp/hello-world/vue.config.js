const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin
    
module.exports={
  configureWebpack: {
    plugins: [
      new BundleAnalyzerPlugin({
        analyzerMode:"static",
        statsFilename:'../report/report.html'
      })
    ]
  }
}