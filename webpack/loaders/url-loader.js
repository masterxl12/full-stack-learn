let mime = require('mime')
/**
 * url-loader
 * 针对配置项中的limit属性，当图片大小小于limit属性时，将图片转换成base64格式
 * @param {*} source 
 * @returns 
 */
function loader(source) {
    let { limit } = this.query;
    if (limit && limit > source.length) {
        // @ts-ignore
        return `module.exports = "data:${mime.getType(this.resourcePath)};base64,${source.toString('base64')}"`
    } else {
        return require('./file-loader').call(this, source)
    }
}
loader.raw = true; // 二进制文件
module.exports = loader