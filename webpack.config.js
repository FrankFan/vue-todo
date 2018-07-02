const path = require('path');
const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const chalk = require('chalk');
const configA = require('./tools/config');
const utils = require('./tools/utils');

const isDev = process.env.NODE_ENV === 'development';
console.log(chalk.white.bgGreen('current mode is ', isDev ? 'development' : 'production'));


let entries = utils.getMultiEntry('./src/' + configA.moduleName + '/*/*.js');

console.log(entries);


const config = {
  // entry: path.join(__dirname, 'src/index.js'),
  entry: entries,
  output: {
    filename: '[name].js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.(png|gif|jpg|jpeg|svg)$/,
        use: {
          loader: 'url-loader', // 把图片转base64代码，减少http请求，url-loader基于file-loader的封装
          options: {
            limit: 1024,
            name: '[name].[ext]',
          },
        },
      },
    ]
  },
  plugins: [
    new VueLoaderPlugin(),
    // new HTMLPlugin(),
  ]
};

if (isDev) {
  config.mode = 'development';
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    },
    {
      test: /\.styl(us)?$/,
      use: [
        'style-loader',
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        'stylus-loader',
      ]
    },
  );
  config.devtool = '#cheap-module-eval-source-map';
  config.devServer = {
    port: 8000,
    host: '0.0.0.0',
    overlay: {
      errors: true,
    },
    open: false,
    hot: true,
  };
  config.plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
  );

  Object.keys(entries).forEach(pathname => {
    let conf = {
      filename: `${pathname}/index.html`,
      template: 'index.html',
      inject: true,
      chunks: ['common/vendor', 'common/manifest', pathname],
    };

    config.plugins.push(new HTMLPlugin(conf));
  });
} else {
  config.mode = 'production';
  // config.entry = {
  //   vendor: ['vue'],
  //   app: path.join(__dirname, 'src/index.js'),
  // };
  // config.output.filename = '[name].[chunkHash:6].js';
  config.output = {
    path: configA.build.assetsRoot,
    filename: utils.assetsPath('[name]/[name].[chunkhash].js'),
    chunkFilename: utils.assetsPath('chunk/[id].[chunkhash].js')
  },
  config.module.rules.push(
    {
      test: /\.css$/,
      use: [
        'style-loader',
        'css-loader',
      ]
    },
    {
      test: /\.styl(us)?$/,
      use: [
        MiniCssExtractPlugin.loader,
        'css-loader',
        {
          loader: 'postcss-loader',
          options: {
            sourceMap: true,
          },
        },
        'stylus-loader',
      ]
    },
  );
  config.plugins.push(
    new CleanWebpackPlugin('dist', {}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: "[name].[contentHash:6].css",
      chunkFilename: "[id].css"
    }),
    new webpack.optimize.SplitChunksPlugin({
      name: 'vendor'
    }),
  );
  // HtmlWebpackPlugin
  Object.keys(entries).forEach(pathname => {
    let conf = {
      filename: `${pathname}/index.html`,
      template: 'index.html',
      inject: true,
      chunks: ['vendor', 'manifest', pathname],
      minify: {
        removeComments: true,
        collapseWhitespace: true,
        removeAttributeQuotes: true
      },
      chunksSortMode: 'dependency'
    };
    config.plugins.push(new HTMLPlugin(conf));
  });
};

module.exports = config;