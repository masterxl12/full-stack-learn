Function.prototype.fakeCall = function (context) {
    context = context || window;
    context.fn = this;
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn;

    return result
}

function add(x = 1, y = 2) {
    console.log(x + y + this.z);
}

const obj = {
    z: 5
}

add.fakeCall(obj, 4, 3)