let babel = require('@babel/core')
let loaderUtils = require("loader-utils")

/**
 * 手写babel-loader
 * @param {*} source 
 * @returns 
 */
function loader(source) {
    console.log(source, "*****************");
    // this -> loaderContext 处理对象的上下文
    console.log(this.query); // 直接使用this.query 获取配置项
    // console.log(loaderUtils.getOptions(this));
    //  webpack5 已经可以通过this.query 直接获取loader的options配置，所以不需要利用loader-utils工具获取
    let options = this.query;
    let cb = this.async() // 异步执行
    // this.addDependency(this.resourcePath) // 添加依赖

    //babel/core 有transform可以转代码成为ast抽象语法树
    babel.transform(source, {
        ...options,
        sourceMaps: true,
        filename: this.resourcePath.split("/").pop()
    }, (err, result) => {
        if (err) {
            cb(err)
        } else {
            cb(null, result.code, result.map)
        }
    })
    return source
}

let str = "AAA750pxBBB760px";
let s = str.replace(/(\d+)px/g, (_, $1, $2) => {
    return parseFloat($1) / 10 + 'rem'
})
console.log(s);

module.exports = loader