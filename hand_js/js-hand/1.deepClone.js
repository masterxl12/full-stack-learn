// 1 深拷贝函数
const deepClone = (target) => {
    if (target === null) return null
    if (typeof target !== 'object') return target
    if (typeof target === 'function') return new Function(target)
    if (target instanceof RegExp) return new RegExp(target)
    if (target instanceof Date) return new Date(target)

    const ctor = new target.constructor;
    for (let key in target) {
        if (Reflect.has(target, key)) {
            ctor[key] = deepClone(target[key])
        }
    }
    return ctor;
}

// test case
let obj = {
    a: 1,
    b: null,
    c: [1, 2, 3],
    d: { name: 'xxx', hobby: 'ball' },
    f: new Date(),
    regExp: /^13|5|7|8|9d{9}$/g,
    fn: function print() {
        console.log("func");
    }
};

let res = deepClone(obj)
console.log(res === obj, res);

// 2. 循环引用的问题，引起内存泄漏
/**
 循环引用问题 obj.o = obj;
 *改进版本
    map set 都是强引用 容易产生内存泄漏
    WeakMap WeakSet 是弱引用
    考察数据类型  -> 基本数据类型 function 正则 日期 对象(object array null) undefined
    typeof Object.prototype.toString.call instanceof constructor
 * 
 * @param {*} target 
 * @param {*} hash 
 * @returns 
 */
const deepCopy = (target, hash = new WeakMap()) => {
    if (target === null) return null
    if (typeof target !== 'object') return target
    if (typeof target === 'function') return new Function(target)
    if (target instanceof RegExp) return new RegExp(target)
    if (target instanceof Date) return new Date(target)

    if (hash.has(target)) return hash.get(target)
    let ctorInstance = new target.constructor;
    hash.set(target, ctorInstance)
    for (let key in target) {
        if (Reflect.has(target, key)) {
            ctorInstance[key] = deepCopy(target[key], hash)
        }
    }
    return ctorInstance
}

obj.o = obj;
let resCopy = deepCopy(obj)
console.log(resCopy);
