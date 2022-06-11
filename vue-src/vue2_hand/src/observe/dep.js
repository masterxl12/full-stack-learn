let id = 0;

class Dep {
    constructor() {
        this.subs = [];
        this.id = id++;
    }

    addSub(watcher) {
        this.subs.push(watcher)
    }

    depend() {
        //  希望 watcher 可以存放dep
        //  实现双向记忆 让water记住dep的同时 让dep也记住watcher
        Dep.target.addDep(this);
    }

    notify() {
        this.subs.forEach(watcher => watcher.update())
    }
}

Dep.target = null; // 静态属性 就一份
let stack = [];

export function pushTarget(watcher) {
    Dep.target = watcher; // 保留watcher
    stack.push(watcher);
}

export function popTarget() {
    stack.pop();
    // 保留watcher
    Dep.target = stack[stack.length - 1];
}

// 多对多的的关系

// 一个属性对应一个dep 用来收集watcher
// dep 可以存多个watcher (渲染watcher) vm.$watch('name') (用户自定义watch)
// 一个 watcher 可以对应多个dep （渲染的当前页面也既是一个watcher）

export default Dep;