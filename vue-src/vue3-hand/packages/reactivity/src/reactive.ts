import { isObject } from "@vue/shared";
import {
    mutableHandlers,
    readonlyHandlers,
    shallowReactiveHandlers,
    shallowReadonlyHandlers,
} from "./baseHandlers";
// 是否是浅的 默认是深度
// 是否是仅读的 默认不是仅读的

export function reactive(target: any) {
    return createReactiveObject(target, false, mutableHandlers);
}

export function shallowReactive(target: any) {
    return createReactiveObject(target, false, shallowReactiveHandlers);
}

export function readonly(target: any) {
    return createReactiveObject(target, true, readonlyHandlers);
}

export function shallowReadonly(target: any) {
    return createReactiveObject(target, true, shallowReadonlyHandlers);
}

/**
 *
 * @param target 拦截的目标
 * @param isReadonly 是不是仅读属性
 * @param baseHandlers 对应的拦截函数
 */
// weakMap(key只能是对象)
const reactiveMap = new WeakMap();
const readonlyMap = new WeakMap();

function createReactiveObject(
    target: any,
    isReadonly: boolean,
    baseHandlers: any
) {
    // 1.如果不是对象直接返回
    if (!isObject(target)) {
        return target;
    }

    const proxyMap = isReadonly ? readonlyMap : reactiveMap; // 获取缓存对象
    const existProxy = proxyMap.get(target);
    // 2.代理过直接返回即可
    if (existProxy) {
        return existProxy;
    }

    // 如果是对象 就做代理 new Proxy
    // 3.代理的核心
    const proxy = new Proxy(target, baseHandlers);
    proxyMap.set(target, proxy);
    // 4.返回代理对象
    return proxy;
}
