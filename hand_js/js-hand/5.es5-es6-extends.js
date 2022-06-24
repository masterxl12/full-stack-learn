function Parent(name) {
    this.name = name
    this.colors = ["red", "green", 'blue']
}

Parent.prototype.sayName = function () {
    console.log(this.name);
}

function Child(name, major) {
    Parent.call(this, name)
    this.major = major;
}

Child.prototype = new Parent();
Child.prototype.constructor = Child;
Child.prototype.showMajor = function () {
    console.log(this.major, this.colors);
}

let child = new Child("xl", "web");
child.sayName();
child.showMajor()


class A {
    constructor(name) {
        this.name = name
        console.log(new.target.name, "target...");
    }

    showName() {
        console.log(this.name, "class...");
    }
}

class B extends A {
    constructor(name, food) {
        super(name)
        this.food = food
    }
    getFood() {
        console.log(this.food, "child...class");
    }
}

let b = new B("kitty", "fish")
b.showName();
b.getFood()