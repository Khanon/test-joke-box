const { merge } = require('webpack-merge');
const common = require('./webpack.base.js');

module.exports = merge(common, {
    entry: {
        app: './src/app.ts',
    },
    mode: 'development',
    target: 'web',
});
