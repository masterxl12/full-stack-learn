import babel from 'rollup-plugin-babel';
import serve from 'rollup-plugin-serve';

export default {
    input: './src/index.js', // 引入的文件
    output: {
        format: 'umd', // amd commonjs规范  默认将打包后的结果挂载到window上
        file: 'dist/vue.js', // 打包出的vue.js 文件  new Vue
        name: 'Vue',
        sourcemap: true
    },
    plugins: [
        babel({ // 解析es6 -> es5
            exclude: "node_modules/**" // 排除文件的操作 glob
        }),
        serve({ // 开启本地服务
            open: true,
            openPage: './index.html', // 打开的页面
            // openPage: './demo_test/watch.html', // 打开的页面
            port: 3000,
            contentBase: ''
        })
    ]
}