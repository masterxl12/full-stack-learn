// @ts-nocheck
// @ts-ignore

Function.prototype.fakeCall = function (context) {
    let args = [...arguments].slice(1);
    context.fn = this;
    let result = context.fn(...args)
    delete context.fn

    return result
}

Function.prototype.fakeApply = function (context) {
    let args = [...arguments]?.[1]
    context.fn = this;

    let result = args.length ? context.fn(...args) : context.fn()
    delete context.fn

    return result
}

function add(x = 1, y = 2) {
    console.log(x + y + this.z);
}

const obj = {
    z: 5
}

add.fakeApply(obj, [3, 4])

function say() {
    console.log(this.name);
}

say.fakeCall({
    name: 'hello'
})