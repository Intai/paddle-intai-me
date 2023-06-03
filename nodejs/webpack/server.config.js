var path = require('path')
var webpack = require('webpack')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var config = require('config')
var timestamp = config.get('timestamp')
var env = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev'

var isExternal = function({ request }, callback) {
  if (request[0] !== '.') {
    return callback(null, 'commonjs2 ' + request)
  }
  callback()
}

module.exports = {
  mode: 'production',
  target: 'node',
  externals: [isExternal],
  context: path.join(__dirname, '../app'),
  entry: [
    './server',
  ],
  plugins: [
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config),
    }),
    new HtmlWebpackPlugin({
      filename: 'server.ejs',
      template: '../app/index.ejs',
      head: '<%- head %>',
      app: '<%- app %>',
      portal: '<%- portal %>',
      inject: false,
      minify: {
        collapseWhitespace: true,
      },
      files: {
        css: [],
        js: [`/static-${timestamp}/client.js`],
      },
    }),
  ],
  resolve: {
    extensions: ['.js', '.jsx', `.${env}.js`, `.${env}.jsx`],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
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
          publicPath: `/static-${timestamp}/fonts/`,
          outputPath: 'fonts/',
        },
      },
    ],
  },
  output: {
    libraryTarget: 'commonjs2',
    path: path.join(__dirname, '../dist'),
    filename: 'server.js',
  },
}
