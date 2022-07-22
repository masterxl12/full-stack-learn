/**
 * css-loader
 * @param {*} source 
 * @returns 
 */
function loader(source) {
    let reg = /url\((.+?)\)/g;
    let pos = 0;
    let current;
    let arr = [
        'let list=[]'
    ]
    while (current = reg.exec(source)) {
        // [matchUrl,g]
        let [mathUrl, g] = current;
        let last = reg.lastIndex - mathUrl.length;
        arr.push(`list.push(${JSON.stringify(source.substring(pos, last))})`)
        pos = reg.lastIndex;
        // 把g替换成require
        arr.push(`list.push('url('+require(${g})+')')`)
    }
    arr.push(`list.push(${JSON.stringify(source.substring(pos))})`)
    arr.push('module.exports=list.join("")')
    // console.log(arr.join('\r\n'));
    return arr.join('\r\n');
}

module.exports = loader