// 柯里化函数 把一个函数的范围进行缩小 让函数更具体

function checkType(type) {
    return function (obj) {
        return Object.prototype.toString.call(obj) === '[object ' + type + ']'
    }
}

let isString = checkType('String');
let isArray = checkType('Array');
let isObject = checkType('Object');
let isFunction = checkType('Function');
let isBoolean = checkType('Boolean');

let flag1 = isString('aaa')
console.log(flag1);

function add(a, b, c) {
    return a + b + c
}

function curry(fn) {
    let len = fn.length;
    let _args = [...arguments].slice(1);
    return (...args) => {
        args = _args ? [..._args, ...args] : args;
        if (args.length < len) {
            return curry(fn, ...args);
        }
        return fn(...args);
    }
}

// @ts-ignore
console.log(curry(add, 1, 2)(3)(4, 5));
console.log(curry(add)(1, 2)(3)(4, 5));
console.log(curry(add)(1)(2)(3)(4, 5));
console.log(curry(add)(1)(2)(3)(4)(5));