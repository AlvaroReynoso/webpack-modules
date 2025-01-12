const path = require('path');
const HtmlWebPackPlugin = require('html-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'main.[contenthash].js',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader',
      },
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
      new TerserPlugin(), // Añadir TerserPlugin para minimizar JavaScript
      new CssMinimizerPlugin(),
    ],
  },
  plugins: [
    new TerserPlugin(),
    new HtmlWebPackPlugin({
      template: './src/index.html',
      filename: './index.html',
    }),
    new MiniCSSExtractPlugin({
      filename: '[name].[contenthash].css',
      ignoreOrder: false,
    }),
    new CopyPlugin({
      patterns: [
        { from: 'src/assets/', to: 'assets/' }
      ],
    }),
  ],
};