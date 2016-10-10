const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const path = require('path')
const ROOT_PATH = path.resolve(__dirname, '..')
const APP_PATH = path.resolve(ROOT_PATH, 'app')
const ASSETS_PATH = path.resolve(APP_PATH, 'assets')
const IMAGES_PATH = path.resolve(ASSETS_PATH, 'images')
const LIB_PATH = path.resolve(ASSETS_PATH, 'libraries')
const TEM_PATH = path.resolve(ASSETS_PATH, 'templates')
const BUILD_PATH = path.resolve(ROOT_PATH, 'build')
const DIST_PATH = path.resolve(ROOT_PATH, 'dist')

module.exports = {
  entry: {
    app: path.resolve(APP_PATH, 'main.js'),
    libs: [
      path.resolve(LIB_PATH, 'clip'),
      path.resolve(LIB_PATH, 'html2canvas'),
      path.resolve(LIB_PATH, 'notify'),
      path.resolve(LIB_PATH, 'richText')
    ],
    vendors: [
      'socket.io-client',
      'vue',
      'vuex',
      'vue-router',
      'whatwg-fetch'
    ]
  },
  output: {
    path: './dist',
    filename: '[name].js',
  },
  devServer: {
    historyApiFallback: true,
    hot: true,
    inline: true,
    progress: true,
  },
  module: {
    loaders: [
      { test: /\.vue$/, loader: 'vue' },
      { test: /\.js$/, loader: 'babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.css$/, loader: 'style!css' },
      { test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192'},
      { test: require.resolve(path.resolve(LIB_PATH, 'fss')), loader: 'exports?FSS'},
      { test: require.resolve(path.resolve(LIB_PATH, 'clip')), loader: 'exports?Clip'}
    ]
  },
  babel: {
    presets: ['es2015', 'stage-0'],
    plugins: ['transform-runtime']
  },
  resolve: {
    extensions: ['', '.vue', '.js'],
    alias: {
      'socket.io-client': path.join('socket.io', 'node_modules', 'socket.io-client'),
      'app_path': APP_PATH,
      'assets_path':  ASSETS_PATH,
      'images_path': IMAGES_PATH,
      'lib_path': LIB_PATH,
      'configuration': path.resolve(APP_PATH, 'configuration')
    }
  },
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({names: ['libs', 'vendors', 'manifest']}),
    new HtmlWebpackPlugin({
      title: 'iChat v0.2',
      favicon: path.resolve(IMAGES_PATH, 'favicon.ico'),
      filename: 'index.html',
      template: path.resolve(TEM_PATH, 'index.html'),
      chunks: ['app', 'libs', 'vendors', 'manifest'],
      inject: 'body'
    })
  ]
}
