var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var ESLintPlugin = require('eslint-webpack-plugin')
var config = require('config')
var env = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev'

module.exports = {
  mode: 'development',
  context: path.join(__dirname, '../app'),
  entry: [
    './index',
  ],
  cache: {
    type: 'filesystem',
    cacheDirectory: path.join(__dirname, '../.cache/webpack'),
  },
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      CONFIG: webpack.DefinePlugin.runtimeValue(() => JSON.stringify(config.util.loadFileConfigs()), {
        contextDependencies: [path.join(__dirname, '../config')],
      }),
    }),
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: '../app/index.ejs',
      inject: false,
      files: {
        css: [],
        js: ['/dev.js'],
      },
    }),
    new ESLintPlugin({
      extensions: ['js', 'jsx'],
      exclude: 'node_modules',
      lintDirtyModulesOnly: true,
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', `.${env}.js`, `.${env}.jsx`],
    symlinks: false,
    alias: {
      app: path.join(__dirname, '../app'),
    },
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      }, {
        test: /\.css$/i,
        include: /node_modules\/@fontsource\/roboto/,
        use: ['style-loader', 'css-loader'],
      }, {
        test: /\.(eot|ttf|woff|woff2)$/,
        include: /node_modules\/@fontsource\/roboto/,
        type: 'asset/resource',
        generator: {
          filename: '[name][ext]',
          publicPath: 'fonts/',
          outputPath: 'fonts/',
        },
      },
    ],
  },
  output: {
    path: path.join(__dirname, '../dist'),
    publicPath: '/',
    filename: 'dev.js',
  },
}
