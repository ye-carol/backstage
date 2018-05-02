/*
* @Author: yao
* @Date:   2018-04-15 11:18:01
* @Last Modified by:   yao
* @Last Modified time: 2018-04-16 15:09:57
*/
const webpack           = require('webpack')
const path              = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require("extract-text-webpack-plugin");
let WEBPACK_ENV = process.env.WEBPACK_ENV || 'dev';
module.exports = {
  entry: './src/app.jsx',
  output: {
    path: path.resolve(__dirname, 'dist'),
    publicPath: WEBPACK_ENV === 'dev' ?  '/dist/' : '//s.jianliwu.com/React1/dist/' ,
    filename: 'js/app.js'
  },
  resolve: {
    alias: {
      page     : path.resolve(__dirname, 'src/pages'),
      component: path.resolve(__dirname, 'src/component'),
      util: path.resolve(__dirname, 'src/util'),
      service: path.resolve(__dirname, 'src/service'),
    }
  },
  module: {
    rules: [
      // react文件处理
      {
        test: /\.jsx$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env','react']
          }
        }
      },
      // css文件处理
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: "style-loader",
          use: "css-loader"
        })
      },
      // sass文件处理
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      },
      // 图片的配置
      {
        test: /\.(png|jpg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: 'rescource/[name].[ext]'
            }
          }
        ]
      },
      // 字体图标的配置
      {
        test: /\.(eot|svg|ttf|woff|woff2|otf)$/,
        use: [
          {
            loader: 'file-loader',
            options: {
              limit: 8192,
              name: 'rescource/[name].[ext]'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 提出公共模块
    new webpack.optimize.CommonsChunkPlugin({
      name: 'common',
      filename: 'js/base.js'
    }),
    // 处理HTML文件
    new HtmlWebpackPlugin({
      template: './src/index.html',
      favicon: './favicon.ico'
    }),
    // 独立css文件
    new ExtractTextPlugin('css/[name].css')
  ],
  devServer: {
    port: 8086,
    historyApiFallback: {
      index: '/dist/index.html'
    },
    proxy: {
      '/manage': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      },
      '/user/logout.do': {
        target: 'http://admintest.happymmall.com',
        changeOrigin: true
      }
    }
  }
};
