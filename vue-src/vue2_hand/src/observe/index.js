import { arrayMethods } from "./array";
import { defineProperty } from '../util';
import Dep from './dep'

class Observer {
    constructor(value) {
        // 判断一个对象是否被观测过 看他有没有 __ob__ 属性
        //  每个数据都增加一个观测的实例 '__ob__'
        this.dep = new Dep(); // value = [] value= {}
        defineProperty(value, '__ob__', this);
        // Object.defineProperty(value, '__ob__', {
        //     enumerable: false, // 不能被枚举
        //     configurable: false,
        //     value: this
        // });

        if (Array.isArray(value)) {
            // 1. 希望调用push shift unshift splice sort reverse pop
            // 函数劫持、切片编程
            value.__proto__ = arrayMethods;
            // 2. 观测数组中对象类型，对象变化也需要做到响应式
            this.observeArray(value);
            // 3. 对于数组添加元素的方法(push,unshift,splice(x,0,xx)),需要考虑增加元素也是对象的情况
        } else {
            // 使用defineProperty 重新定义属性
            this.walk(value)
        }
    }

    observeArray(value) {
        for (let i = 0; i < value.length; i++) {
            if (Object.prototype.toString.call(value[i]) === '[object Object]') {
                observe(value[i]);
            }
        }
    }

    walk(data) {
        // 1. 获取对象的key
        let keys = Object.keys(data);
        for (let key of keys) {
            defineReactive(data, key, data[key])
        }
    }
}

function defineReactive(data, key, value) {
    let childDep = observe(value); // 可能是数组也可能是对象
    //  默认弄个数据会递归去调用defineProperty 进行拦截 性能差 -> proxy(vue3)
    //  observe(value); // 递归调用 如果是多层级对象继续遍历 -> 变成响应式
    let dep = new Dep();  // 每个属性都对应一dep
    // 当页面取值时 说明这个值用来渲染  将这个watcher和这个属性对应起来
    Object.defineProperty(data, key, {
        get() {
            if (Dep.target) { // 让这个属性记住watcher
                dep.depend(); // 依赖收集
                if (childDep) {
                    childDep.dep.depend();
                }
                // console.log(dep.subs);
            }
            // console.log('取值...');
            return value;
        },
        set(newValue) {
            // console.log("设置值...");
            if (value === newValue) return;
            observe(newValue); // 如果用户将值改为对象继续监控
            value = newValue;
            dep.notify();   // 依赖更新
            // return newValue;
        }
    })
}

export function observe(data) {
    // typeof data = object 也可能是null
    // 观测的原则1 -> 是对象
    if (typeof data !== 'object' || data == null) {
        return;
    }
    // 观测的原则2 -> 没有观测的才被观测
    if (data.__ob__) {
        return data;
    }

    return new Observer(data)
}