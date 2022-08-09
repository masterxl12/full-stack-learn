
const curry = (fn, ...args) => {
    let len = fn.length
    return (...rest) => {
        args = args ? [...args, ...rest] : rest
        if (args.length < len) {
            return curry(fn, ...args)
        }
        return fn.apply(null, args)
    }
}

const foo = (a, b, c, d) => {
    return a + b + c + d
}

console.log(curry(foo, 1)(2)(3, 4));
console.log(curry(foo)(1)(2)(3)(4));

const unCurry = (fn) => {
    return (...args) => {
        let context = args.shift();
        return fn.apply(context, args)
    }
}