// urlParser转换函数
const urlParser = (urlStr) => {
    let idx = urlStr.search(/\?/);
    let strArr = urlStr.substring(idx + 1).split("&")

    return strArr.reduce((prev, curr) => {
        let [key, value] = curr.split("=")
        prev[key] = value;
        return prev
    }, {})
}

// test case
let url = "http:www.baidu.com?name=zs&age=18&major=web"
console.log(urlParser(url), "urlParser")
