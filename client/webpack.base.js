const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");

var config = {
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: '[name].js'
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            'ts-loader',
          ]
        }
      ]
    },
    plugins: [
      new CopyPlugin({
          patterns: [
            { from: "assets/*", to: "" },
            { from: "index.html", to: "" },
          ],
      }),
    ],
};

module.exports = config;
