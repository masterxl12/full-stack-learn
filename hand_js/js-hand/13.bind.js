Function.prototype._bind = function (context = window) {
    let fn = this;
    let args = [...arguments].slice(1);

    let boundFunction = function () {
        args = args.concat([...arguments]);
        // this.constructor -> boundFunction.prototype.constructor -> fn.prototype.constructor = fn
        // this instanceof boundFunction true
        // this instanceof fn true
        console.log(this instanceof boundFunction, true);
        console.log(this instanceof fn, true);
        fn.apply(this.constructor === fn ? this : context, args)
    }
    boundFunction.prototype = Object.create(fn.prototype)
    return boundFunction
};
let obj = {
    z: 1
};

function Person(x, y) {
    this.name = 'xl';
}

Person.prototype.age = 25;
let P = Person._bind(obj, 2);
let person = new P(3);
console.log(person.name, person.age);

function add(x, y) {
    console.log(x + y + this.z);
}

let bound = add._bind(obj, 2);
bound(3);

function bind(context = window) {
    let fn = this;
    let args = [...arguments].slice(1);

    let boundFunction = function () {
        args = args.concat([...arguments])
        fn.apply(this.constructor === fn ? this : context, args)
    }
    boundFunction.prototype = Object.create(fn.prototype)

    return boundFunction
}

function apply(context = window) {
    context.fn = this;
    let result;
    if (arguments[1]) {
        result = context.fn(...arguments)
    } else {
        result = context.fn()
    }
    delete context.fn;
    return result
}

function call(context = window) {
    context.fn = this;
    let result = context.fn([...arguments].slice(1))
    delete context.fn;
    return result
}


let o = { a: { b: { c: '1', d: { e: "2" } } } }

function objFlatten(obj) {
    let result = {};

    let itemFlat = function (itemObj, preKey = "") {
        Object.entries(itemObj).forEach(([key, value]) => {
            preKey = preKey ? `${preKey}.${key}` : key;
            if (typeof value === 'object') {
                itemFlat(value, preKey)
            } else {
                result[preKey] = value
            }
        })
    }
    itemFlat(obj)
    return result;
}

console.log(objFlatten(o));