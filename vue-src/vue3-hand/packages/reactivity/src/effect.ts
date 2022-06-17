import { isIntegerKey } from "@vue/shared";

export function effect(fn: any, options: any = {}) {
    // 创建响应式effect
    const effect = createReactiveEffect(fn, options);
    // 默认会让effect先执行一次
    if (!options.lazy) {
        effect();
    }
    return effect
}

export let activeEffect: any;
const effectStack: any[] = [];
let id = 0;

function createReactiveEffect(fn: any, options: any): any {
    const effect = function () {
        try {
            effectStack.push(effect)
            activeEffect = effect;
            return fn(); // 执行用户传递的fn -> 取值操作
        } finally {
            effectStack.pop();
            activeEffect = effectStack[effectStack.length - 1];
        }
    }
    effect.id = id++;// 用于做标识的
    effect.__isEffect = true;// 标识是响应式effect
    effect.options = options;
    effect.deps = [] as any;// effect依赖的属性

    return effect
}

/**
 * 构建映射关系： 存储结构
 * Map{
 *  {name:"",age:""}:{
 *     name: new Set(effect,effect),
 *     age: new Set(effect,effect)
 *  }
 * }
 * 
 * @param target 目标对象
 * @param type 
 * @param key 
 * @returns 
 */
const targetMap = new WeakMap();
export function track(target: any, type: string, key: any) {
    if (activeEffect === undefined) { // 如果不在effect中取值，则无需记录
        return
    }
    let depsMap = targetMap.get(target);
    if (!depsMap) {
        targetMap.set(target, (depsMap = new Map()));
    }
    let dep = depsMap.get(key);
    if (!dep) {
        depsMap.set(key, (dep = new Set()));
    }
    if (!dep.has(activeEffect)) {
        dep.add(activeEffect);
        // activeEffect.deps.push(dep);
    }
}

export function trigger(target: any, type: string, key: any, newValue: any, oldValue?: any) {
    const depsMap = targetMap.get(target);
    if (!depsMap) return;
    const effectsSet = new Set();
    const add = (effectsAdd: Set<any>) => {
        effectsSet && effectsAdd.forEach(effect => effectsSet.add(effect));
    }

    // 1. 如果更改的数组长度 小于依赖收集的长度 要触发重新渲染
    // 2. 如果调用了push方法 或者其他新增数组的方法（改变长度的方法），也要触发更新
    if (key === 'length' && Array.isArray(target)) { // 如果修改的是长度
        depsMap.forEach((dep: Set<any>, key: string) => {
            // 如果有长度的依赖要更新  如果依赖的key小于设置的长度也要更新 
            if (key >= newValue || key === 'length') {
                add(dep)
            }
        });
    } else {
        add(depsMap.get(key));
        switch (type) {
            case "add":
                if (Array.isArray(target) && isIntegerKey(key)) {
                    add(depsMap.get('length'));
                }
            default:
                break;
        }
    }

    effectsSet.forEach((effect: any) => effect()); // 执行effect
}