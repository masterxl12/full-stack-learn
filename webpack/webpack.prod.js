const { merge } = require('webpack-merge')
const base = require("./webpack.base")

// @ts-ignore
module.exports = merge(base, {
    mode: 'production',
    devtool: 'source-map',
    optimization: {
        // minimize: true,
    }
})