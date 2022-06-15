class A {
    constructor(name) {
        this.name = name
    }

    sayName = () => {
        console.log(this.name);
    }
}

const a = new A("zs")
a.sayName()