Function.prototype.fakeApply = function (context) {
    context = context || window;
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn(...arguments[1])
    } else {
        result = context.fn()
    }
    delete context.fn;

    return result
}

const add = function (x = 1, y = 2) {
    console.log(x + y + this.z)
}

const obj = {
    z: 4
}

add.fakeApply(obj, [5, 6])
