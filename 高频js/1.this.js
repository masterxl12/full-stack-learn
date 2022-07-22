let name = 'window'

function showName() {
    console.log("1", this.name);
}
// 1. 普通函数调用
showName()

let obj = {
    name: 'hello',
    fn1() {
        console.log(this.name);
    },
    b: {
        name: 'world',
        fn() {
            console.log(this.name, this);
        }
    },
}

// 2. 对象方法调用
console.log("2.1", "**************");
obj.fn1();
obj.b.fn()

let other = obj.b;
console.log("2.2", "==============");
other.fn()

console.log("2.3", "&&&&&&&&&&&&&&");
let foo = obj.b.fn;
foo();

// 3. 使用构造函数使用
let TestCtor = function (name = 'hlj') {
    console.log(this);
    this.name = name
}
let instance = new TestCtor('ali')
console.log(3, instance.name);
instance.name = 'hah...'
console.log(3, instance.name);

console.log("***********华丽的分割线********")
let A = { n: 10 }
let B = function () {
    this.n = 100
}
let C = function () {
    let n = 1000
}

B.prototype = A;
C.prototype = A;
let b = new B();
let c = new C();
A.n++;
console.log(b.n);
console.log(c.n);

// 4. 箭头函数 结合定时器使用
let info = {
    a: 222,
    fn() {
        console.log("4", "***", this);
        // 回调是普通函数
        setTimeout(function () {
            console.log(this, this.a);
        })

        // 回调是箭头函数
        setTimeout(() => {
            console.log(this.a, "lll", this);
        })
    }
}

info.fn()

// 5. call，apply使用
let bar = {
    name: "bar name...",
}
console.log("5", "call...");
obj.b.fn.call(bar)

