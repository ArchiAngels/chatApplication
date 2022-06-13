const path = require('path');

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
              presets: ['@babel/preset-react','@babel/preset-env']
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
  }


};