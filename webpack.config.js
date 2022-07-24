const path = require('path');
// const fs = require('fs');
// const child_process = require('node:child_process');
// const crypto = require('crypto');
// const net = require('net');
// const tls = require('tls');

// child_process: 'empty',
// fs: 'empty',
// crypto: 'empty',
// net: 'empty',
// tls: 'empty'

module.exports = {

  entry: './src/Main.jsx',
  mode:'development',

  output: {
    path: path.resolve(__dirname, 'client','dist'),
    filename: 'app.bundle.js',
    clean: true,
  },
  

  module:{
    rules: [
        {
          test: /\.jsx$/,
          exclude: /(node_modules|bower_components)/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-react',['@babel/preset-env',{
                useBuiltIns: "usage",
                corejs: { version: "3.8"}
              }]]
            }
          }
        },
        {

          test: /\.(woff|woff2|eot|ttf|otf)$/i,
  
          type: 'asset/resource',
  
        },
        {

          test: /\.(png|svg|jpg|jpeg|gif)$/i,
  
          type: 'asset/resource',
  
        },
      ]
  },
  // node: {
  //   "child_process": 'empty',
  //   "fs": 'empty',
  //   "crypto": 'empty',
  //   "net": 'empty',
  //   "tls": 'empty'
  // },
  // resolve:{
  //   fallback:{
  //     "url": require.resolve("url/"),
  //     "stream": require.resolve("stream-browserify"),
  //     "crypto": require.resolve("crypto-browserify"),
  //     "http": require.resolve("stream-http"),
  //     "https": require.resolve("https-browserify"),
  //       "zlib": require.resolve("browserify-zlib"),
  //       // "tls" : require.resolve('tls'),
  //       // "net" : require.resolve('net'),
  //       "utf-8-validate" : require.resolve('utf-8-validate'),
  //     "os": require.resolve("os-browserify/browser"),
  //     "path": require.resolve("path-browserify"),
  //     // 'fs': require.resolve('fs'),
  //     "fs": false,
  //     "path": false,
  //     "os": false,

  //     // "zlib": false,
  //     // "tls" : false,
  //     // "net" : false,
  //     // "utf-8-validate" : false,
  //     // "child_process":require.resolve('child_process'),
  //     // "tls" : false,
  //     // "net" : false,


  //   }
  // },
  


};