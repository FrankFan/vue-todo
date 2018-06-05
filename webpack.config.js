const path = require('path');

module.exports = {
  entry: path.join(__dirname, 'src/index.js'),
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
        ]
      },
      {
        test: /\.styl$/,
        use: [
          'style-loader',
          'css-loader',
          'stylus-loader',
        ]
      },
      {
        test: /\.(gif|png|jpg|jpeg|svg)$/,
        use: {
          loader: 'url-loader', // 把图片转base64代码，减少http请求，url-loader基于file-loader的封装
          options: {
            limit: 1024,
            name: '[name].[ext]',
          },
        },
      },
    ]
  }
}