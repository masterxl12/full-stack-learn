const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const webpackConfig = {
    // 静态服务器配置
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
    },
    mode: 'production',
    // 多入口配置
    entry: {
        home: './src/index.js',
    },
    output: {
        filename: '[name].js',
        // 打包后的路径 绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'home.html',
            chunks: ['home'],
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: 'other.html',
            minify: {
                removeAttributeQuotes: true,
                // collapseWhitespace: true
            },
            chunks: ['other'],
        })
    ],
    // 监控文件变化 并实时打包
    watch: true,
    watchOptions: {
        // 监控的选项
        poll: 1000,
        aggregateTimeout: 500, // 防抖 一直输入
        ignored: /node_modules/, // 忽略监控的文件
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js$/,
                use:
                {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                    }
                }
            },
        ]
    },
    resolve: {
        modules: [path.resolve(__dirname, 'node_modules')],
        extensions: ['.js', '.json', '.jsx', '.css', '.scss', '.less'],
        alias: {
            '@': path.resolve(__dirname, 'src'),
        }
    }
}

module.exports = webpackConfig