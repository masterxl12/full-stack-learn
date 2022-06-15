import { popTarget, pushTarget } from "./dep";
import { nextTick } from "../util";

let id = 0;

/**
 * 渲染
 * $watcher
 * computed
 */
class Watcher {
    //     new Watcher(vm, updateComponent, () => {
    //     }, true);
    /**
     * @param vm        vm实例
     * @param exprOrFn  vm._update(vm._render())
     * @param cb        callHook(vm,'beforeUpdate')
     * @param options
     */
    constructor(vm, exprOrFn, cb, options = {}) {
        this.vm = vm;
        this.exprOrFn = exprOrFn;
        this.cb = cb;
        this.options = options;
        this.user = options.user;   // 用户传入的watcher (自定义watch走此逻辑)

        this.lazy = options.lazy;   //  如果watcher上有lazy属性 说明是一个计算属性
        this.dirty = this.lazy;     //  dirty 代表取值时是否执行用户提供的方法

        this.id = id++;             // watcher的唯一标识
        this.deps = [];             // watcher 记录有多少dep依赖他
        this.depsId = new Set();
        // 1. 渲染watcher(走的是更新逻辑) -> updateComponent
        if (typeof exprOrFn === 'function') {
            this.getter = exprOrFn;
        } else {
            // 2. 用户watcher
            // 传入的是字符串 用户传入的watcher -> 'a.a.a'(){}
            this.getter = () => {
                // 去当前实例上取值时 才会触发依赖收集
                let path = exprOrFn.split('.');
                let obj = vm;
                for (let i = 0; i < path.length; i++) {
                    // 从当前实例中去data中的值
                    obj = obj[path[i]]; // vm.a.a.a -> 拿到监控data中的属性值 也即是watcher中的key
                }
                return obj;
            }
        }
        // 默认会调用一次get方法 进行取值 将结果保留
        this.value = this.lazy ? void 0 : this.get();// 默认会调用get方法 // 如果是计算属性 什么都没做
        // console.log(this.value);
    }

    addDep(dep) {
        // 多次调用去重
        let id = dep.id;
        if (!this.depsId.has(id)) {
            this.deps.push(dep);
            this.depsId.add(id);
            dep.addSub(this);
        }
    }

    get() {
        // 依靠js的单线程
        pushTarget(this);   // 当前watcher实例
        let result;
        if (this.lazy) {
            // 计算属性值重新赋值（用到data中的值） this -> 应该指向vm实例 而不是watcher
            result = this.getter.call(this.vm);
        } else {
            result = this.getter();
        }
        // 默认会调用exprOrFn 渲染页面 取值走get方法
        popTarget();
        return result;
    }

    run() {
        let newValue = this.get(); // 用户修改data中的值 渲染逻辑
        let oldValue = this.value;
        this.value = newValue;  // 更新老值 下次判断比对使用
        // 如果是用户传入的watcher 表明是用户watcher
        if (this.user) {
            this.cb.call(this, newValue, oldValue);
        }
    }

    evaluate() {
        // this.get -> 调用this.getter() -> 调用用户传入的exprOrFn -> computed对应方法执行 this.firstName + this.lastName;
        this.value = this.get();
        this.dirty = false; // 取完值后将dirty标记false 表示已经取过值了
    }

    update() {
        if (this.lazy) { // 进入这里说明是计算属性
            this.dirty = true; // 页面重新渲染就可以获取最新的值了
        } else {
            // 赋值改变 触发更新
            // 这里不需要每次调用get方法
            // this.get();
            queueWatcher(this);
        }
    }

    depend() {
        // stack -> [“渲染watcher”,"计算属性watcher"]
        //  计算属性watcher 会存储

        //  通过watcher找到对应所有的dep 让所有的dep 都记住这个渲染watcher
        let i = this.deps.length; // firstName lastName
        while (i--) {
            this.deps[i].depend(); // 让dep去 存储渲染watcher
        }
    }
}


let queue = []; // 将需要批量更新的watcher 存到一个队列中  稍后执行watcher 执行
let has = {};
let pending = false;

function flushSchedulerQueue() {
    queue.forEach(watcher => {
        watcher.run();
        if (!watcher.user) {
            watcher.cb(); // 渲染watcher
        }
    });
    has = {}; // 清空标识的id
    queue = []; // 清空watcher队列，为了下次使用
    pending = false;
}

function queueWatcher(watcher) {
    let id = watcher.id; // 对watcher去重
    if (has[id] == null) {
        queue.push(watcher);// 并且将watcher存到队列中
        has[id] = true;
        // 等待所有同步代码执行完毕后再执行
        if (!pending) {
            // 等待所有同步代码执行完毕后在执行
            nextTick(flushSchedulerQueue);
            // setTimeout(() => { // 如果还没清空队列 就不要开定时器
            //     // console.log(queue,123);
            //
            // }, 0);
            pending = true;
        }
    }
    // console.log(watcher.id);
}

export default Watcher;