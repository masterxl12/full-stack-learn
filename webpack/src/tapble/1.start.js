// const { SyncHook } = require("tapable");

class SyncHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => task(...args));
    }
}

// 同步添加熔断器
class SyncBailHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let ret; // 当前函数的返回值
        let index = 0; // 当前要先执行第一个
        do {
            console.log(ret, "***");
            ret = this.tasks[index++](...args);
        } while (ret === undefined && index < this.tasks.length);
        // this.tasks.forEach(task => task(...args));
    }
}

// 同步瀑布钩子 流程控制
class SyncWaterfallHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        this.tasks.forEach(task => {
            let ret;
            do {
                ret = task(...args);
            } while (ret !== undefined);
        })
    }
}
// 同步遇到不返回undefined的监听函数多次执行
class SyncLoopHook {
    constructor(args) {
        this.tasks = [];
    }
    tap(name, task) {
        this.tasks.push(task);
    }
    call(...args) {
        let [first, ...others] = this.tasks;
        let ret = first(...args);
        others.reduce((a, b) => b(a), ret);
    }
}

class Lesson {
    constructor() {
        this.hooks = {
            arch: new SyncWaterfallHook(['name'])
        }
    }
    tap() {
        this.hooks.arch.tap('node', name => {
            console.log('node', name);
            return 'next1';
        })
        this.hooks.arch.tap('react', name => {
            console.log('react', name);
            return 'next2';
        })
        this.hooks.arch.tap('vue', name => {
            console.log('vue', name);
        })
    }
    start() {
        this.hooks.arch.call('webpack');
    }
}

const lesson = new Lesson();
lesson.tap();
lesson.start();