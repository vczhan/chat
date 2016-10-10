const webpack = require('webpack')
const config = require('./webpack.base.config.js')

// config.plugins = (config.plugins || []).concat([
//   new webpack.HotModuleReplacementPlugin()
// ])

// config.plugins = (config.plugins || []).concat([
//   new webpack.DefinePlugin({
//     NODE_ENV: '"development"'
//   })
// ])

config.devtool = '#eval-source-map'

config.devServer = {
  noInfo: true
}

module.exports = config
