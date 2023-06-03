var path = require('path')
var webpack = require('webpack')
// var BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
var config = require('config')
var timestamp = config.get('timestamp')
var env = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev'

module.exports = {
  mode: 'production',
  context: path.join(__dirname, '../app'),
  entry: [
    './index',
  ],
  plugins: [
    // new BundleAnalyzerPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.DefinePlugin({
      CONFIG: JSON.stringify(config),
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
    path: path.join(__dirname, '../dist'),
    publicPath: `/static-${timestamp}/`,
    filename: 'client.js',
    chunkFilename: '[name].client.js',
  },
}
