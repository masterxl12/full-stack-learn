import { isObject } from "@vue/shared";
import { effect, track, trigger } from "./effect";

class ComputedRefImpl {
    public effect: any;
    public _value: any;
    public _dirty = true;
    constructor(public getter: any, public setter: any) {
        this.effect = effect(getter, {
            lazy: true,
            scheduler: (effect: any) => {
                if (!this._dirty) {
                    console.log("ok....用户依赖更新的属性");
                    this._dirty = true;
                    trigger(this, "set", "value");
                }
            }
        });
    }

    get value() {
        if (this._dirty) {
            this._value = this.effect();
            this._dirty = false;
        }
        track(this, "get", "value");
        return this._value;
    }

    set value(newValue: any) {
        this.setter(newValue);
    }
}

export function computed(getterOrOptions: any) {
    let getter: any;
    let setter: any;

    if (isObject(getterOrOptions)) {
        getter = getterOrOptions.get;
        setter = getterOrOptions.set;
    } else {
        getter = getterOrOptions;
        setter = () => {
            console.log("computed not setter");
        }
    }
    return new ComputedRefImpl(getter, setter);
}