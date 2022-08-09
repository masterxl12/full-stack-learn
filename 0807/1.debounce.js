// @ts-nocheck


const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer)
        let context = args?.shift()
        timer = setTimeout(() => {
            fn(context, ...args)
        }, delay);
    }
}

const throttle = (fn, delay) => {
    let flag = false
    return (...args) => {
        if (flag) return
        flag = true
        let context = args?.shift()
        setTimeout(() => {
            flag = false
            fn(context, ...args)
        }, delay);
    }
}

// 21 * 13 -> 
const curry = (fn, ...args) => {
    let len = fn.length;

    return (...rest) => {
        args = args ? [...args, ...rest] : rest
        if (args.length < len) {
            return curry(fn, ...args)
        }
        return fn(...args)
    }
}

const add = (a, b, c, d) => a + b + c + d

console.log(curry(add, 1)(2)(3)(4));
console.log(curry(add, 1, 2)(3)(4));
console.log(curry(add, 1, 2, 3)(4));
console.log(curry(add)(1)(2)(3)(4));
console.log(curry(add)(1, 2)(3)(4));

const unCurry = (fn) => {
    return (...args) => {
        let context = args?.shift()
        fn.apply(context, args)
    }
}

const isPlainObj = (obj) => Object.prototype.toString.call(obj) === "[object Object]"
const flatObj = (obj) => {
    let result = {}
    const flatItem = (value, preKey = '') => {
        Object.entries(value).map(([key, data]) => {
            let newKey = preKey ? `${preKey}.${key}` : key
            if (isPlainObj(data)) {
                flatItem(data, newKey)
            } else {
                result[newKey] = data
            }
        })
    }

    flatItem(obj)
    return result
}

const bar = { a: { b: { c: { d: { e: 1 } } }, p: { q: 2 }, m: 3 }, n: 4 }
console.log(flatObj(bar));

const uniqueArr1 = (arr) => [...new Set(arr)]
const uniqueArr2 = (arr) => {
    return arr.reduce((prev, curr) => prev.includes(curr) ? prev : [...prev, curr], [])
}
const uniqueArr3 = (arr) => {
    return arr.filter((value, index) => arr.indexOf(value) === index)
}
const uniqueArr4 = (arr) => {
    let obj = {}
    arr.map((value) => !Reflect.has(obj, value) && (obj[value] = value))
    return Object.values(obj)
}

const testArr = [1, 2, 1, true, 2, 3, 3, undefined, undefined, null, null, false, false, true]
console.log(uniqueArr1(testArr));
console.log(uniqueArr2(testArr));
console.log(uniqueArr3(testArr));
console.log(uniqueArr4(testArr));

Promise._all = function (promises) {
    return new Promise((resolve, reject) => {
        let result = [];
        let idx = 0;
        let dataFn = (data, index) => {
            result[index] = data;
            if (++idx === promises.length) {
                resolve(result)
            }
        }
        promises.map((value, index) => {
            try {
                if (value && typeof value.then === 'function') {
                    value.then((data) => dataFn(data, index), reject)
                } else {
                    dataFn(value, index)
                }
            } catch (e) {
                reject(e)
            }
        })
    })
}

const promises = [Promise.resolve(1), 10, new Promise((resolve) => resolve(100)), new Promise((resolve) => setTimeout(() => resolve(1000), 1000))]
console.time("data")
Promise._all(promises).then(data => {
    console.timeEnd("data")
    console.log(data, "data...");
})

const deepClone = (target, hash = new WeakMap()) => {
    if (target === null) return null
    if (typeof target !== 'object') return target
    if (typeof target === 'function') return new Function(target)
    if (target instanceof RegExp || target instanceof Date) return target.constructor(target)

    if (hash.has(target)) return hash.get(target)
    let Ctor = target.constructor
    let instance = new Ctor(target)
    hash.set(target, instance)
    for (let key in target) {
        if (Reflect.has(target, key)) {
            instance[key] = deepClone(target[key], hash)
        }
    }
    return instance
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
obj.o = obj;
console.log(deepClone(obj));

Function.prototype.fakeBind = function (context = window, ...args) {
    let fn = this;

    let boundFunction = (...rest) => {
        args = args ? [...args, ...rest] : rest
        fn.apply(this.constructor === fn ? this : context, args)
    }
    boundFunction.prototype = Object.create(fn.prototype)
    return boundFunction
}

const foo = {
    x: 42,
    getX: function () {
        console.log(this.x);
    }
}

let bindGetX = foo.getX;
let bindFn = bindGetX.fakeBind({
    x: 100
})
bindFn()

