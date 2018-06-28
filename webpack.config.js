// const webpack = require('webpack')
const path = require('path')
const merge = require('webpack-merge')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const IS_PROD = process.env.npm_lifecycle_event === 'build'
const outputFilename = IS_PROD ? '[name]-[chunkhash].js' : '[name].js'

console.log('WEBPACK GO!')

const commonConfig = {
  entry: {
    app: path.join(__dirname, 'src/index.tsx')
  },
  output: {
    path: path.join(__dirname, 'build'),
    filename: outputFilename
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.scss'],
    modules: [path.join(__dirname, 'src'), 'node_modules']
  },
  module: {
    rules: [{
      test: /\.(tsx?)|(js)$/,
      exclude: /node_modules/,
      use: 'babel-loader'
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/index.html',
      inject: 'body',
      filename: 'index.html'
    })
  ]
}

const developmentConfig = {
  mode: 'development',
  devtool: 'inline-source-map',
  module: {
    rules: [{
      test: /\.sc?ss$/,
      use: ['style-loader', 'css-loader', 'sass-loader']
    }]
  }
}

const productionConfig = {
  mode: 'production',
  module: {
    rules: [{
      test: /\.sc?ss$/,
      use: [MiniCssExtractPlugin.loader, 'css-loader', 'postcss-loader', 'sass-loader']
    }]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: 'styles-[hash].css'
    }),
    new CopyWebpackPlugin([{
      from: 'src/assets/',
      to: 'assets/'
    }])
  ],
  performance: {
    hints: false
  }
}

module.exports = merge(commonConfig, IS_PROD ? productionConfig : developmentConfig)
