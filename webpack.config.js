const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
module.exports = {
  mode: 'development',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.js',
    clean: true,
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist'),
    },
    open: true,
  },
  module: {
    rules: [
      {
        test: /\.html$/,
        use: [
          {
            loader: 'html-loader',
            options: {
              sources: true,
              minimize: false,
            },
          },
        ],
      },
      {
        test: /\.css$/,
        use: [MiniCSSExtractPlugin.loader, 'css-loader'],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      `...`,
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' }
      ],
    }),
  ],
};