require('dotenv').config();

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const LodashModuleReplacementPlugin = require('lodash-webpack-plugin');

const DEV = process.env.NODE_ENV !== 'production';
const INCLUDE_PATH = path.join(__dirname, 'src');

const devEntry = {
  app: [
    'react-hot-loader/patch',
    'webpack-dev-server/client?http://localhost:3000',
    'webpack/hot/only-dev-server',
    './index.js',
  ],
};

const prodEntry = {
  app: [
    './index.js',
  ],
  vendor: [
    'antd',
    'prop-types',
    'react-dom',
    'react-hot-loader',
    'react-redux',
    'react-router-dom',
    'react',
    'redux-actions',
    'redux-async-initial-state',
    'redux-saga',
    'redux',
    'reselect',
    'uuid',
  ],
};

const defaultPlugins = [
  new HtmlWebpackPlugin({
    template: './www/index.html',
    minify: {
      collapseWhitespace: true,
      removeComments: true,
      minifyJS: true,
      minifyCSS: true,
    },
  }),
  new webpack.DefinePlugin({
    'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV),
  }),
];

const devPlugins = [
  new webpack.HotModuleReplacementPlugin(),
  new webpack.NamedModulesPlugin(),
  new webpack.NoEmitOnErrorsPlugin(),
];

const prodPlugins = [
  new ExtractTextPlugin('style.css'),
  new webpack.optimize.CommonsChunkPlugin({
    names: ['vendor', 'bundle'],
  }),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compress: {
      screw_ie8: true,
      warnings: false,
    },
    mangle: {
      screw_ie8: true,
    },
    output: {
      comments: false,
      screw_ie8: true,
    },
  }),
  new LodashModuleReplacementPlugin({
    paths: true,
    shorthands: true,
    cloning: true,
    currying: true,
    caching: true,
    collections: true,
    exotics: true,
    guards: true,
    metadata: true,
    deburring: true,
    unicode: true,
    chaining: true,
    memoizing: true,
    coercions: true,
    flattening: true,
    placeholders: true,
  }),
];

const defaultRules = [
  { test: /\.eot(\?v=\d+.\d+.\d+)?$/, include: INCLUDE_PATH, loader: 'file-loader' },
  { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, include: INCLUDE_PATH, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
  { test: /\.[ot]tf(\?v=\d+.\d+.\d+)?$/, include: INCLUDE_PATH, loader: 'url-loader?limit=10000&mimetype=application/octet-stream' },
  { test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, include: INCLUDE_PATH, loader: 'url-loader?limit=10000&mimetype=image/svg+xml' },
  { test: /\.(jpe?g|png|gif)$/i, include: INCLUDE_PATH, loader: 'file-loader?name=[name].[ext]' },
  { test: /\.ico$/, include: INCLUDE_PATH, loader: 'file-loader?name=[name].[ext]' },
  { test: /\.jsx?$/, include: INCLUDE_PATH, loader: 'babel-loader' },
];

const devRules = [
  {
    test: /\.css$/,
    use: ['style-loader', 'css-loader'],
  },
  {
    test: /\.less$/,
    include: INCLUDE_PATH,
    use: [
      'style-loader',
      {
        loader: 'css-loader',
        options: {
          sourceMap: true,
          modules: true,
          importLoaders: true,
          localIdentName: '[name]-[local]-[hash:base64:10]',
        },
      },
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [autoprefixer],
        },
      },
      {
        loader: 'less-loader',
        options: {
          sourceMap: true,
        },
      },
    ],
  },
];

const prodRules = [
  {
    test: /\.css$/,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: 'css-loader',
    }),
  },
  {
    test: /\.less$/,
    include: INCLUDE_PATH,
    use: ExtractTextPlugin.extract({
      fallback: 'style-loader',
      use: [
        {
          loader: 'css-loader',
          options: {
            sourceMap: true,
            modules: true,
            importLoaders: true,
            localIdentName: '[name]-[local]-[hash:base64:10]',
          },
        },
        {
          loader: 'postcss-loader',
          options: {
            plugins: () => [autoprefixer],
          },
        },
        {
          loader: 'less-loader',
          options: {
            sourceMap: true,
          },
        },
      ],
    }),
  },
];

module.exports = {
  context: path.join(__dirname, 'src'),
  devtool: DEV ? 'cheap-module-eval-source-map' : 'cheap-hidden-source-map',
  entry: DEV ? devEntry : prodEntry,
  plugins: defaultPlugins.concat(DEV ? devPlugins : prodPlugins),
  output: {
    filename: DEV ? '[name].js' : '[name].min.js',
    path: path.join(__dirname, 'dist'),
    publicPath: DEV ? 'http://localhost:3000/' : '/',
  },
  module: {
    rules: defaultRules.concat(DEV ? devRules : prodRules),
  },
  resolve: {
    extensions: ['.js', '.jsx'],
    modules: [path.resolve(__dirname, './src'), 'node_modules'],
  },
  devServer: {
    publicPath: 'http://localhost:3000/',
    contentBase: path.join(__dirname, 'dist/'),
    hot: true,
    port: 3000,
    historyApiFallback: true,
    stats: {
      chunks: false,
      colors: true,
      reasons: true,
    },
  },
};
