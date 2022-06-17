import { hasOwn, isIntegerKey, isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { reactive, readonly } from "./reactive";

/**
 * @param isReadonly 是不是仅读
 * @param shallow 是不是浅响应
 */
function createGetter(isReadonly = false, shallow = false) {
    /**
     * @param target  原来的对象
     * @param key  属性值
     * @param receiver  代理对象
     */
    return function get(target: any, key: string, receiver: any) {
        const res = Reflect.get(target, key, receiver)
        if (!isReadonly) {
            track(target, "get", key);
        }
        if (shallow) {
            return res
        }
        if (isObject(res)) {  // 取值时递归代理
            return isReadonly ? readonly(res) : reactive(res)
        }

        return res;
    };
}

function createSetter(shallow = false) {
    return function set(target: any, key: string, value: any, receiver: any) {
        const oldValue = target[key];
        let hasKey = Array.isArray(target) && isIntegerKey(key) ? Number(key) < target.length : hasOwn(target, key);
        const res = Reflect.set(target, key, value, receiver)
        if (!hasKey) {
            trigger(target, "add", key, value);
        } else if (oldValue !== value) {
            trigger(target, "set", key, value, oldValue);
        }
        return res;
    };
}

const get = createGetter();
const shallowGet = createGetter(false, true);
const readonlyGet = createGetter(true);
const shallowReadonlyGet = createGetter(true, true)

const set = createSetter();
const shallowSet = createSetter(true);
const readonlySet = {
    set(target: any, key: any) {
        console.warn(`Set operation on key "${String(key)}" failed: target is readonly.`)
        return true;
    }
}

export const mutableHandlers = {
    get, set
};

export const shallowReactiveHandlers = {
    get: shallowGet,
    set: shallowSet
};

export const readonlyHandlers = {
    get: readonlyGet,
    ...readonlySet
};

export const shallowReadonlyHandlers = {
    get: shallowReadonlyGet,
    ...readonlySet
};

