//1. set + ...展开运算符
Array.prototype.unique1 = function () {
    let source = this;
    return [...new Set(source)];
};

//2. reduce + 对象key值的唯一性
Array.prototype.unique2 = function () {
    let source = this;
    let result = source.reduce((prev, curr) => {
        if (!Reflect.has(prev, curr)) {
            prev[curr] = curr;
        }
        return prev
    }, {});
    return Object.values(result)
};

//3. filter + indexOf + Object.is
Array.prototype.unique3 = function () {
    let source = this;
    let flagNaN = false
    return source.filter((item, index, array) => {
        if (Object.is(item, NaN) && !flagNaN) {
            let idx = array.findIndex(e => Object.is(e, NaN))
            flagNaN = true
            return idx === index
        } else {
            return array.indexOf(item) === index
        }
    });
};

//4. reduce + includes 
Array.prototype.unique4 = function () {
    let source = this;
    return source.reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], []);
};

//5. forEach + map + ...展开运输符
Array.prototype.unique5 = function () {
    let source = this;
    let weakMap = new Map()
    source.forEach(item => {
        if (!weakMap.has(item)) {
            weakMap.set(item, item)
        }
    })
    return [...weakMap.values()]
};
//其他实现方式 扩展

// test case
let arr = [1, 2, 3, 1, 2, 3, null, undefined, NaN, NaN, null, undefined];

console.log(arr.unique1());
console.log("unique1");
console.log(arr.unique2());
console.log("unique2");
console.log(arr.unique3());
console.log("unique3");
console.log(arr.unique4());
console.log("unique4");
console.log(arr.unique5());

