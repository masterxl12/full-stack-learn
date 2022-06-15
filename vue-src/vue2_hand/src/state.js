import { observe } from "./observe/index";
import { proxy, nextTick } from './util'
import Watcher from "./observe/watcher";
import Dep from "./observe/dep";

export function initState(vm) {
    const opts = vm.$options;
    // if (opts.props) {
    //     initProps(vm)
    // }
    // if (opts.methods) {
    //     initMethods(vm)
    // }
    if (opts.data) {
        // 数据的初始化
        initData(vm)
    }
    if (opts.computed) {
        // 计算属性的初始化
        initComputed(vm)
    }
    if (opts.watch) {
        initWatch(vm)
    }
}

function initProps() {

}

function initMethods() {

}

/*-------------------------------------data-start-------------------------------------------*/

// 数据的初始化动作
function initData(vm) {
    let data = vm.$options.data;

    vm._data = data = typeof data == 'function' ? data.call(vm) : data;
    //  1. 数据的劫持方案 对象 Object.defineProperty
    //  2. 数组 单独处理的

    //  3. 当我去vm取属性时，帮我将属性的取值代理到vm._data 上
    // 循环代理数据
    for (let key in data) {
        // 实现vm.__data.msg -> vm.msg
        proxy(vm, '_data', key);
    }
    observe(data)
}

/*-------------------------------------computed-start-------------------------------------------*/
function initComputed(vm) {
    let computed = vm.$options.computed;
    // 1. watcher 2. 还需要通过defineProperty 3. dirty
    const watchers = vm._computedWatchers = {};// 用来存放计算属性的watcher
    for (let key in computed) {
        const userDef = computed[key]; // 取出对应的值  有可能是对象写法 带有get set
        //  获取get方法
        const getter = typeof userDef == 'function' ? userDef : userDef.get; // watcher使用
        // 给每个属性添加一个watcher
        watchers[key] = new Watcher(vm, getter, () => {
        }, { lazy: true }); //    标记watcher是懒的 不调用不会自动执行
        defineComputed(vm, key, userDef);
    }
}

function defineComputed(target, key, userDef) {
    const sharedPropertyDefinition = { // 共享属性定义
        enumerable: true,
        configurable: true,
        get: () => {
        },
        set: () => {
        }
    };

    //  需要加缓存
    if (typeof userDef == 'function') {
        sharedPropertyDefinition.get = createComputedGetter(key) // dirty 来控制是否调用userDef
    } else {
        sharedPropertyDefinition.get = createComputedGetter(key); // 需要加缓存
        sharedPropertyDefinition.set = userDef.set;
    }
    Object.defineProperty(target, key, sharedPropertyDefinition)
}

// ['渲染watcher','计算属性watcher']
function createComputedGetter(key) {
    return function () { // 每次取值会调用此方法
        const watcher = this._computedWatchers[key];
        if (watcher) {
            // 默认肯定是脏的, 第一次取值走这里watcher.dirty=true  
            // 后面再次取值watcher.dirty=false 直接返回
            // 如果有修改 再次走这里取值watcher.dirty=true
            if (watcher.dirty) {
                watcher.evaluate(); // 对当前watcher求值
                // 执行完之后 计算属性watcher出栈 
            }
            if (Dep.target) { // Dep.target = '渲染watcher'
                // 此时的watcher -> '计算属性watcher'
                // 然后让计算属性 依赖的firstName lastName再去收集添加渲染watcher
                watcher.depend();
            }
            return watcher.value; // 默认返回watcher上存的值
        }
    }
}

/*----------------------------------------watcher-start-------------------------------------------*/
function initWatch(vm) {
    let watch = vm.$options.watch;
    for (let key in watch) {
        const handler = watch[key]; // handler可能是数组、字符串、对象、函数
        if (Array.isArray(handler)) { // 数组
            handler.forEach(handle => createWatcher(vm, key, handle))
        } else {
            createWatcher(vm, key, handler);// 字符串、对象、函数
        }
    }
    /*
        也是一个watcher,实质是一个user watcher
        默认存一个老值，每次更新数据，再去拿到一个新值，对比新值和老值，
        取值之前，会把用户watcher放在全局上，取值时会自动做依赖收集
    */
}

function createWatcher(vm, expOrFn, handler, options) { // options 可以用来标识是用户watcher
    if (typeof handler === 'object') {
        /* 这种情况调用
        a: {
                    handler(newVal, oldVal) {
                        console.log(newVal, oldVal);
                    },
                    immediate: true
            }
        */
        options = handler;
        handler = handler.handler; // 是一个函数
    }

    if (typeof handler == 'string') {
        handler = vm[handler]; // 实例对象上的方法 methods中的方法
    }

    // 最后都是key  handler 用户传入的options
    return vm.$watch(expOrFn, handler, { ...options, user: true });
}


export function stateMixin(Vue) {
    Vue.prototype.$nextTick = function (cb) {
        nextTick(cb);
        // console.log(cb, 'nextTick');
    };

    Vue.prototype.$watch = function (expOrFn, cb, options) {
        // 数据应该依赖这个watcher 数据变化后应该让watcher重新执行
        let watcher = new Watcher(this, expOrFn, cb, options);
        if (options && options.immediate) { // 如果是immediate 立刻执行
            cb.call(this, watcher.value); // watch.value 为实例化后返回的结果
        }
    }
}
