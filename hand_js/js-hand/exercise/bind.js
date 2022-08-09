// @ts-nocheck

Function.prototype.fakeBind = function (context = window) {
    let fn = this
    let args = [...arguments].slice(1)

    let boundFunction = function () {
        args = args.concat([...arguments])
        fn.apply(this.constructor === fn ? fn : context, args)
    }

    boundFunction.prototype = Object.create(fn.prototype)
    return boundFunction
}

let obj = {
    z: 1
};

function add(x, y) {
    console.log(x + y + this.z);
}

let bound = add.fakeBind(obj, 2);
bound(3);