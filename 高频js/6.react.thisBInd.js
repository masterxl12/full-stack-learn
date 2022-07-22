let obj = {
    name: "hello",
    display: function () {
        console.log(this.name); // 'this' 指向 obj
    }
}
obj.display()

function test(callback, delay) {
    callback();
}

test(obj.display, 1000)

class Foo {
    constructor(name) {
        this.name = name
    }

    display() {
        console.log(this.name);
    }
}

var foo = new Foo('Saurabh');
foo.display(); // Saurabh

let bar = foo.display
bar()