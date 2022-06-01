// 发布订阅 发布和订阅之间没有任何关系
// 观察者模式 （内部基于发布订阅）而且被观察者状态发生变化 将通知观察者更新 二者有关联

class Subject {
    constructor(name) {
        this.name = name
        this.state = "行情很好..."
        this.deps = [];
    }

    attach(dep) {
        this.deps.push(dep)
    }

    changeState(state) {
        this.state = state;
        this.deps.forEach(dep => dep.update(this))
    }
}

class Observer {
    constructor(name) {
        this.name = name
    }

    update(subject) {
        const { name, state } = subject;
        console.log(`${name}提出${state},并询问${this.name}作出响应...`);
    }
}

let sub1 = new Subject("银行螺丝钉")
let obj1 = new Observer("小散a");
let obj2 = new Observer("小散b");
sub1.attach(obj1);
sub1.attach(obj2);

sub1.changeState("加仓，跑步前进。。。")
