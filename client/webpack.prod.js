const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
    entry: {
        launcher: './src/launcher.ts',
        app: './src/app.ts',
    },
    mode: 'production',
    target: 'node',
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    format: {
                        comments: false,
                    },
                },
                extractComments: false,
                parallel: true,
            }),
        ],
    },
    performance: {
        hints: false,
    },
    devtool: false,
    plugins: [
        new CleanWebpackPlugin(),
    ]
});
