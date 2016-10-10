const webpack = require('webpack')
const config = require('./webpack.base.config')

const path = require('path')
const DIST_PATH = path.resolve('./dist')

const CleanWebpackPlugin = require('clean-webpack-plugin')

config.output = {
  path: './dist',
  filename: '[name].[chunkhash:8].js',
  chunkFilename: '[name].[chunkhash].js'
}

config.plugins = (config.plugins || []).concat([
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': '"production"'
  }),
  new webpack.optimize.UglifyJsPlugin({
    compress: {
      warnings: false
    }
  }),
  new webpack.optimize.OccurenceOrderPlugin(),
  new CleanWebpackPlugin([DIST_PATH], {
    root: process.cwd()
  })
])

module.exports = config
