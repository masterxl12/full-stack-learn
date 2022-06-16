import ts from 'rollup-plugin-typescript2' // 解析ts插件
import resolvePlugin from '@rollup/plugin-node-resolve' // 解析第三方模块
import path from 'path'

// 获取packages的绝对路径
let packagesDir = path.resolve(__dirname, 'packages')
// 获取对应打包的路径
let packageDir = path.resolve(packagesDir, process.env.TARGET)

// 获取这个路径下的package.json
const resolve = p => path.resolve(packageDir, p)
const pkg = require(resolve("package.json"))
const packageOptions = pkg.buildOptions
const name = path.basename(packageDir) // 获取目录的最后一个名字

// import/require/window.xxx （es6 node 全局）三种使用方式
const outputConfigs = {
    'esm-bundler': {
        file: resolve(`dist/${name}.esm-bundler.js`), // webpack打包用的
        format: `es`
    },
    'cjs': {
        file: resolve(`dist/${name}.cjs.js`), // node使用的
        format: 'cjs'
    },
    'global': {
        file: resolve(`dist/${name}.global.js`), // 全局的
        format: 'iife'
    }
}

function createConfig(format, output) {
    output.name = packageOptions.name
    output.sourcemap = true
    return {
        input: resolve(`src/index.ts`), // 打包的入口
        output,
        plugins: [
            ts({
                tsconfig: path.resolve(__dirname, 'tsconfig.json')
            }),
            resolvePlugin(),
        ]
    }
}

export default packageOptions.formats.map(format => createConfig(format, outputConfigs[format]));
