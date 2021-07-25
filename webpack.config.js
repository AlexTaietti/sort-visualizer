const path = require('path');
const HTMLPlugin = require('html-webpack-plugin');
const DEMO_PATH = path.resolve(__dirname, 'demo');

module.exports = {

   mode: "development",

   resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
   },

   module: {
      rules: [{ test: /\.ts?$/, use: ['babel-loader', 'ts-loader'], exclude: /node_modules/ }],
   },

   plugins: [
      new HTMLPlugin({ template: path.join(DEMO_PATH, 'index.html') })
   ],

   output: {
      filename: 'algos.js'
   },

   devtool: 'source-map',

   devServer: {
      publicPath: '/assets',
      port: 1996,
      contentBase: 'demo',
      watchContentBase: true,
      open: true
   }

};