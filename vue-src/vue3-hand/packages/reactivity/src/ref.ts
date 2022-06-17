import { isObject } from "@vue/shared";
import { track, trigger } from "./effect";
import { reactive } from "./reactive";

export function ref(value: any) {
    return createRef(value)
}

function createRef(rawValue: any, shallow = false) {
    return new RefImpl(rawValue, shallow)
}

// 递归响应式对象
const convert = (value: any) => isObject(value) ? reactive(value) : value;

// 借助类的属性构造器 get set 来实现
class RefImpl {
    public _value: any
    constructor(public _rawValue: any, public _shallow: boolean) {
        this._value = _shallow ? _rawValue : convert(_rawValue);
    }

    get value() {
        track(this, "get", "value");
        return this._value
    }

    set value(newValue: any) {
        if (newValue !== this._rawValue) {
            this._rawValue = newValue;
            this._value = this._shallow ? newValue : convert(newValue);
            trigger(this, "set", "value", newValue);
        }
    }
}

class ObjectRefImpl {
    public __v_isRef: boolean = true;
    constructor(public target: any, public key: string) { }

    get value() {
        return this.target[this.key]
    }

    set value(newValue: any) {
        this.target[this.key] = newValue;
    }
}

export function toRef(target: any, key: string) {
    return new ObjectRefImpl(target, key)
}

export function toRefs(target: any) {
    const res: any = Array.isArray(target) ? new Array(target.length) : {};
    for (const key in target) {
        res[key] = toRef(target, key);
    }

    return res;
}