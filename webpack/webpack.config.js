const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const FileListPlugin = require('./plugins/FileListPlugin')
const ZipPlugin = require('./plugins/ZipPlugin')
let px2remLoaderPath = path.resolve(__dirname, 'loaders/px2rem-loader.js')
let px2vwLoaderPath = path.resolve(__dirname, 'loaders/px2vw-loader.js')

const webpackConfig = {
    // 静态服务器配置
    devServer: {
        static: path.join(__dirname, "dist"),
        compress: true,
        port: 9000,
        open: true,
    },
    mode: 'development',
    // 多入口配置
    entry: './src/index.js',
    output: {
        filename: '[name].js',
        // 打包后的路径 绝对路径
        path: path.resolve(__dirname, 'dist')
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
        })
    ],
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                "@babel/preset-env",
                                "@babel/preset-react"
                            ]
                        }
                    }
                ]
            },
            {
                test: /\.css$/,
                use: [
                    "style-loader",
                    'css-loader',
                    {
                        // loader: px2remLoaderPath,
                        loader: px2vwLoaderPath,
                        options: {
                            remUnit: 75,
                            remPrecision: 8,
                            exclude: /antd\.css/
                        }
                    }
                ]
            }
        ]
    },
    resolveLoader: {
        // modules: [path.resolve(__dirname, 'loaders'), "node_modules"]
        // modules: [path.resolve(__dirname, 'loaders')]
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