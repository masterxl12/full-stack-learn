let loaderUtils = require("loader-utils")

/**
 * 手写file-loader
 * 根据图片生成一个md5戳，并发射到dist目录下 同时返回当前的图片路径
 * @param {*} source 
 * @returns 
 */
function loader(source) {
    let options = this.query;
    let filename = loaderUtils.interpolateName(this, '[hash].[ext]', {
        content: source
    })
    console.log("🚀 ~ file: file-loader.js ~ line 15 ~ loader ~ filename", filename)
    // 发射文件
    this.emitFile(filename, source)
    return `module.exports = "${filename}"`
}
loader.raw = true; // 二进制文件
module.exports = loader