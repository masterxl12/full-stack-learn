
export default function compose(...fns) {
    if (fns.length === 0) {
        return arg => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce((a, b) => (...args) => a(b(...args)));
}

function add1(str) {
    return str + '1';
}

function add2(str) {
    return str + '2';
}

function add3(str) {
    return str + '3';
}

const composeFn = compose(add3, add2, add1);
let result = composeFn("hello");
console.log("🚀 ~ file: compose.js ~ line 27 ~ result", result)