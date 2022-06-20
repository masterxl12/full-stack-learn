// @ts-nocheck
// 2 数组reduce函数手写
let arr = [1, 2, 3, 4];

Array.prototype.fakeReduce = function (reducer, initValue) {
    let source = this;
    let tempArr = source.slice();
    initValue && tempArr.unshift(initValue)

    let index, accumulator;
    while (tempArr.length > 1) {
        // initValue 有初始值时 -> index =0 否则 index -> 1
        index = source.length - tempArr.length + 1;
        accumulator = reducer.call(null, tempArr[0], tempArr[1], index, source)
        tempArr.splice(0, 2, accumulator)
    }
    return tempArr[0];
}

let res1 = arr.fakeReduce((prev, curr, index) => {
    console.log(prev, curr, index);
    return prev + curr
})

console.log(res1);

