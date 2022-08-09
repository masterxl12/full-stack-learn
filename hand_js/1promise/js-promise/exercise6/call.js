// @ts-nocheck

Function.prototype.fakeCall = function (context = window) {
    context.fn = this;
    let args = [...arguments].slice(1)
    let result = context.fn(...args)
    delete context.fn
    return result
}

Function.prototype.fakeApply = function (context = window) {
    context.fn = this;
    let args = [...arguments]?.[1]
    let result;
    if (args.length) {
        result = context.fn(...args)
    } else {
        result = context.fn()
    }
    delete context.fn
    return result
}

Function.prototype.fakeBind = function (context = window) {
    let fn = this;
    let args = [...arguments].slice(1);

    let boundFunction = function () {
        args = args.concat([...arguments])
        return fn.apply(this.constructor === fn ? this : context, args)
    }
    // boundFunction.prototype = Object.create(fn.prototype)
    boundFunction.prototype = create(fn.prototype)
    return boundFunction
}

const obj = {
    x: 42,
    getX: function () {
        return this.x;
    }
};

const bindGetX = obj.getX;
const boundGetX = bindGetX.fakeBind(obj)
let d = boundGetX()

console.log(d)

/******************************** create  ******************************/
function create(prototype) {
    let F = function () { }
    F.prototype = prototype
    return new F()
}

/******************************** instanceof  ******************************/
function instanceOf(instance, Ctor) {
    let proto = instance.__proto__;
    let prototype = Ctor.prototype
    while (prototype) {
        if (proto === prototype) return true
        prototype = prototype.prototype
    }
    return false
}

function Person() { }
console.log(instanceOf(new Person(), Person));

/******************************** new  ******************************/
function newCtor(Ctor) {
    let obj = {};
    let args = [...arguments].slice(1);
    obj.__proto__ === Ctor.prototype
    Ctor.call(obj, ...args)
    return obj
}

function Person(name) {
    this.name = name
}
let p = newCtor(Person, "bar")
console.log(p.name, p);