// 判断构造函数的prototype属性是否存在于实例对象的原型链上
function instanceOf(left, Ctor) {
    let prototype = Ctor.prototype;
    let getProto = Object.getPrototypeOf
    while (true) {
        if (left === null) return false
        // left.__proto__ = prototype
        if (getProto(left) === prototype) return true
        left = getProto(left)
    }
}

class Person {
    constructor(name) {
        this.name = name;
    }
}

let p = new Person("Kobe");
console.log(instanceOf(p, Object));