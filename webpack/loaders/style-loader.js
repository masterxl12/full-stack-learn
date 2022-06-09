let loaderUtils = require("loader-utils");

function loader(source) {
    // 可以在style-loader导出一个脚本
    let str = `let style = document.createElement('style');
    style.innerHTML = ${JSON.stringify(source)}
    document.head.appendChild(style)`

    return str
}

loader.pitch = function (remainingRequest) {
    // 剩余的请求
    // 让style-loader去处理less-loader!css-loader!./index.less;

    let str = `let style = document.createElement('style');
    style.innerHTML = require(${loaderUtils?.stringifyRequest(
        // @ts-ignore
        this, "!!" + remainingRequest)})
    document.head.appendChild(style)`

    return str;
}

module.exports = loader