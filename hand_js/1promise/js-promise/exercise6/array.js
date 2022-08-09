// @ts-nocheck

/******************************** reduce ******************************/
const testArr = [1, 2, 3, 4, 5]
Array.prototype.fakeReduce = function (reducer, initialValue) {
    let source = this
    let tempArr = source.slice();
    initialValue && tempArr.unshift(initialValue)

    let result, index
    while (tempArr.length > 1) {
        index = source.length - tempArr.length + 1;
        result = reducer.call(null, tempArr[0], tempArr[1], index, source)
        tempArr.splice(0, 2, result)
    }
    return tempArr[0]
}

const result = testArr.fakeReduce((prev, curr) => prev + curr, 6)
console.log("🚀 ~ file: array.js ~ line 3 ~ result", result)

/******************************** unique ******************************/
let uniqueArr = [1, 2, 3, 1, 2, 3, 4, 4, undefined]
const unique1 = [...new Set(uniqueArr)]
console.log(unique1);

const unique2 = (arr) => arr.filter((item, index) => {
    // let idx = arr.findIndex((value, index) => Object.is(value, null) ? index : item === value)
    let idx = arr.findIndex((value, index) => value === item)
    return idx === index
})

console.log(unique2(uniqueArr));

const unique3 = (arr) => arr.reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], [])

const unique4 = (arr) => {
    let obj = {};
    arr.map((item) => {
        if (!Reflect.has(obj, item)) {
            obj[item] = item
        }
    })
    return Object.values(obj)
}

console.log(unique4(uniqueArr), "4");

const unique5 = (arr) => arr.filter((item, index) => arr.indexOf(item) === index)

console.log(unique5(uniqueArr), "5");


const flat = (arr) => arr.reduce((prev, curr) => prev.concat(Array.isArray(curr) ? [...flat(curr)] : curr), [])
console.log(flat([[1, [2, [3, [4], [5]]]]]));

const flat2 = (arr) => {
    try {
        let arrStr = JSON.stringify(arr)
        let regExp = /\[|\]/g;
        let _result = arrStr.replace(regExp, '')
        return JSON.parse(`[${_result}]`)
    } catch (e) {
        console.log(e)
    }
}

console.log(flat2([[1, [2, [3, [4], [5]]]]]));