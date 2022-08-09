const deepCloneTest = (target, hash = new WeakMap()) => {
    if (target === null || typeof target !== 'object') return target
    if (typeof target === 'function') return new Function(target)
    if (target instanceof Date) return new Date(target)
    if (target instanceof RegExp) return new RegExp(target)

    if (hash.has(target)) return hash.get(target)
    let ctorInstance = new target.constructor
    hash.set(target, ctorInstance)

    for (const key in target) {
        if (Reflect.has(target, key)) {
            ctorInstance[key] = deepCloneTest(target[key], hash)
        }
    }

    return ctorInstance
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
let result = deepCloneTest(obj)
console.log(result);