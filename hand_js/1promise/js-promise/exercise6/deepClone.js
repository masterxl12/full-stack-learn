
const deepClone = (target, hash = new WeakMap()) => {
    if (target === null) return null
    if (typeof target !== 'object') return target
    if (typeof target === 'function') return new Function(target)
    if (target instanceof RegExp || target instanceof Date) return target.constructor(target)

    if (hash.has(target)) return hash.get(target)
    let ctorInstance = new target.constructor;
    hash.set(target, ctorInstance)
    for (let key in target) {
        if (Reflect.has(target, key)) {
            ctorInstance[key] = deepClone(target[key], hash)
        }
    }

    return ctorInstance
}

// test case
let obj1 = {
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
obj1.o = obj1

let res = deepClone(obj1)
console.log(res === obj1, res);