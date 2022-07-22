// 函数柯里化 与 反柯里化
function curry(fn) {
    let len = fn.length;
    let _args = [...arguments].slice(1);
    return function (...args) {
        args = _args ? [..._args, ...args] : args;
        if (args.length < len) {
            return curry(fn, ...args)
        }
        return fn(...args)
    }
}
let multi = function (a, b, c, e) {
    console.log("乘积:", a * b * c * e);
};

let curryMulti = curry(multi);
curryMulti(2)(3)(4)(10);
curryMulti(2, 3)(4)(10);
curryMulti(2)(3, 4)(10);
curryMulti(2, 3, 4)(10);

// 反柯里化 -> 扩大函数的适用性 使本来只有特定对象才适用的方法，扩展到更多的对象使用
function unCurrying(fn) {
    return function () {
        let context = [].shift.call(arguments)
        return fn.apply(context, arguments)
    }
}

let test = 'a,b,c'
let split = unCurrying(String.prototype.split)
console.log(split(test, ','));