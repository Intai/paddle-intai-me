var path = require('path')
var gulp = require('gulp')
var del = require('del')
var log = require('fancy-log')
var PluginError = require('plugin-error')
var spawn = require('child_process').spawn
var webpack = require('webpack')
var webpackStream = require('webpack-stream')
var WebpackDevServer = require('webpack-dev-server')

function clean() {
  return del('dist')
}

function devServer() {
  const port = process.env.PORT || 80
  const compiler = webpack(require('./webpack/dev.config.js'))

  new WebpackDevServer({
    port,
    host: '0.0.0.0',
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, 'static'),
      publicPath: '/static/',
    },
  }, compiler)
    .startCallback(err => {
      if (err) throw new PluginError('webpack-dev-server', err)
      log('[webpack-dev-server]', 'http://localhost:' + port)
    })
}

function buildClient() {
  const env = (process.env.NODE_ENV === 'production') ? 'prod' : 'dev'
  return gulp.src(`app/index.${env}.js`)
    .pipe(webpackStream(require('./webpack/client.config.js'), webpack))
    .pipe(gulp.dest('dist'))
}

function buildServer() {
  return gulp.src('app/server.js')
    .pipe(webpackStream(require('./webpack/server.config.js'), webpack))
    .pipe(gulp.dest('dist'))
}

function copyViews() {
  return gulp.src('app/sitemap.ejs')
    .pipe(gulp.dest('dist'))
}

function copyStatic() {
  return gulp.src('static/**/*')
    .pipe(gulp.dest('dist'))
}

function setEnv(env) {
  return function setNodeEnv(cb) {
    process.env.NODE_ENV = env
    cb()
  }
}

function prodServer(cb) {
  const port = process.env.PORT || 8080
  const cmd = spawn('node', [
    'dist/server.js',
  ], {
    stdio: 'inherit',
  })

  log('[express]', 'http://localhost:' + port)
  cmd.on('close', cb)
}

const build = gulp.series(
  clean,
  buildClient,
  buildServer,
  copyViews,
  copyStatic,
)

const prod = gulp.series(
  setEnv('production'),
  build,
  prodServer,
)

const dev = gulp.series(
  clean,
  devServer,
)

gulp.task('build', build)

gulp.task('prod', prod)

gulp.task('dev', dev)

gulp.task('default', dev)
