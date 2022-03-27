const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const { DefinePlugin } = require('webpack');
const dotenv = require('dotenv');

module.exports = {
  entry: path.resolve(__dirname, '../src/index.tsx'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    filename: '[name].[fullhash].js'
  },
  plugins: [
    // Removes/cleans build folders and unused assets when rebuilding
    new CleanWebpackPlugin(),

    // Generates an HTML file from a template
    new HtmlWebpackPlugin({
      inject: true,
      hash: false,
      filename: 'index.html',
      template: path.resolve(__dirname, '../src/index.html')
    }),

    new MiniCssExtractPlugin({
      filename: 'css/[name][fullhash].css'
    }),

    new DefinePlugin({
      'process.env': JSON.stringify(dotenv.config().parsed)
    })
  ],
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'ts-loader',
        options: {
          transpileOnly: true
        },
        exclude: /node_modules/
      },
      {
        test: /\.((c|sa|sc)ss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          'postcss-loader',
          'sass-loader'
        ]
      },
      {
        test: /\.(png|gif|jpe?g|svg|avif|webp)$/i,
        type: 'asset',
        generator: {
          filename: 'images/[name].[hash:6][ext]'
        }
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset',
        generator: {
          filename: 'fonts/[name].[hash:6][ext]'
        }
      }
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
    modules: [path.resolve(__dirname, '../src'), 'node_modules']
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin()]
  },
  devServer: {
    proxy: {
      '/': {
        target: 'https://quattrogatewayassetclient.dev.bordatech.com/'
      }
    }
  }
};
