// @ts-nocheck
/**
 * 字节二面的考察题
 * 1. 使用call,apply,bind方法 分别打印 2 1
 * @param {*} o 
 */
function test(o) {
    console.log(this.sex);
    console.log(o.sex)
}
const o1 = { sex: 1 }
const o2 = { sex: 2 }

// 1. call 调用
// test.call(o2, o1)

// 2. apply 调用
// test.apply(o2, [o1])

// 3. bind 调用实现
let fn = test.bind(o2);
fn(o1)

Function.prototype.bind2 = function (o) {
    return this.bind(o);
};

// 实现 bind2
console.log("-----------------");
let fn2 = test.bind2(o2);
fn2(o1);
