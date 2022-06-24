
function fakeNew() {
    let obj = {};
    let Ctor = Array.prototype.shift.call(arguments);
    // obj.__proto__ = Ctor.prototype;
    obj = fakeCreate(Ctor.prototype)
    // obj = Object.create(Ctor.prototype)
    console.log("🚀 ~ file: 3.new.js ~ line 8 ~ fakeNew ~ obj", obj)
    const result = Ctor.apply(obj, arguments);
    return typeof result === 'object' ? result : obj;
}

function Person(name) {
    this.name = name;
}

Person.prototype.sayName = function () {
    console.log(this.name);
}

let p = fakeNew(Person, "hello");
p.sayName()
console.log(p, "**");


function fakeCreate(proto) {
    function F() { }
    F.prototype = proto;
    return new F()
}