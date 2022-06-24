// 1. JSON.String + regexp

Array.prototype.flat1 = function () {
    let source = this;
    let arrStr = JSON.stringify(source).replace(/\[|\]/g, '')
    return JSON.parse(`[${arrStr}]`)
}

// 2. recursive + reduce
Array.prototype.flat2 = function () {
    let source = this;
    let arr = source.reduce((prev, curr) => Array.isArray(curr) ? [...prev, ...curr.flat2()] : [...prev, curr], [])
    return arr
}

// 3. recursive + forEach + concat
Array.prototype.flat3 = function () {
    let source = this;
    let result = []
    source.forEach((item) => {
        if (Array.isArray(item)) {
            result = result.concat(item.flat3())
        } else {
            result.push(item)
        }
    })
    return result
}


// test case
let arr = [1, 2, [1, 2, [1, 2, [8, 3, 4,]]]]
console.log(arr.flat(Infinity));
console.log("flat1");
console.log(arr.flat1());
console.log("flat2");
console.log(arr.flat2());
console.log("flat3");
console.log(arr.flat3());