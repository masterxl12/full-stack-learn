const { merge } = require('webpack-merge')
const base = require("./webpack.base")

// @ts-ignore
module.exports = merge(base, {
    mode: 'development',
    devtool: 'source-map',
    optimization: {
        // 分割代码块
        splitChunks: {
            // 缓存组
            cacheGroups: {
                common: {
                    chunks: 'initial',
                    minSize: 0,
                    minChunks: 2,// 使用超过两次
                }
            },
            // 针对第三方库分割
            vendor: {
                priority: 1,
                test: /[\\/]node_modules[\\/]/,
                chunks: 'initial',
                minSize: 0,
                minChunks: 2,
            }
        }
    }
})