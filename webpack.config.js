const path = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ImageminPlugin = require('imagemin-webpack-plugin').default
const imageminPngquant = require('imagemin-pngquant')
const imageminJpegRecompress = require('imagemin-jpeg-recompress')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const chalk = require('chalk')

let config
let setPlugins
let setStyleRules
let isDev
let publicPath
let outputPath

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
isDev = process.env.NODE_ENV !== 'production'
publicPath = '/'
outputPath = path.join(__dirname, 'build')

console.log('environment: ' + chalk.bgGreen(` ${process.env.NODE_ENV} `) + '\n')

//plugins assigned to a variable so dev and prod can each have their own plugins
setPlugins = () => {
  if (!isDev) { //prod
    return [
      new webpack.DefinePlugin({
        'process.env': { NODE_ENV: JSON.stringify('production') }
      }),
      new HtmlWebpackPlugin({
        template: './app/index.tpl.html',
        inject: 'head',
        filename: 'index.html'
      }),
      new ImageminPlugin({
        test: /\.(png|jpg|svg)$/,
        plugins: [
          imageminJpegRecompress({max: 75}),
          imageminPngquant({quality: '65-80'})
        ]
      }),
      new ExtractTextPlugin({
        filename: path.join('css','[name]-[hash].css')
      }),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        minChunks: function (module) {
          return module.context && (module.context.indexOf('node_modules') !== -1 || module.context.indexOf('_lib') !== -1);
        }
      })
    ]
  }
  else { //dev
    return [
      new HtmlWebpackPlugin({
        template: './app/index.tpl.html',
        inject: 'head',
        filename: 'index.html'
      })
    ]
  }
}

// css/less rules object assigned to a variable so we can use it in both dev and prod flow
setStyleRules = () => {

  let loaders = isDev ? ['style-loader'] : []

  loaders.push(
    {
      loader: 'css-loader',
      options: {
        sourceMap: isDev,
      }
    },
    {
      loader: 'less-loader',
      options: {
        sourceMap: isDev,
      },
    },
    {
      loader: 'postcss-loader',
      options: {
        plugins: [autoprefixer],
        minimize: !isDev
      },
    }
  )

  return isDev ? loaders : ExtractTextPlugin.extract({use: loaders})
}

//main config
config = {
  entry: {
    app: [path.join(__dirname, 'index.js')]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  module: {
    rules: [
      //*** js
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader',
            options: {
              'presets': ['es2015', 'stage-0']
            }
          }
        ]
      },
      //*** styles
      {
        test: /\.(less|css)$/,
        use: setStyleRules()
      },
      //*** bundled images
      {
        test: /\.(png|jpg|svg)$/,
        use: {
          loader: 'url-loader',
          options: {
            limit: 10000,
            name: 'img/[name].[ext]'
          }
        }
      }
    ]
  },
  plugins: setPlugins(),
  // output path for prod is in the main .net app
  output: {
    path: outputPath,
    filename: path.join('js', '[name]-[hash].js'),
    publicPath: publicPath
  },
  devServer: {
    publicPath: publicPath
  },
  devtool: isDev ? 'eval-sourcemap' : false
}

module.exports = config
