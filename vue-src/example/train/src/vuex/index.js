// @ts-nocheck
let Vue;

const forEachValue = (obj, callback) => {
    Object.keys(obj).forEach(key => {
        callback(obj[key], key)
    })
}

class Store {
    constructor(options) {
        let { state, getters, mutations, actions } = options

        let computed = {}; //使用计算属性
        this.getters = {};

        forEachValue(getters, (fn, key) => {
            // 将用户的属性保存在computed
            computed[key] = () => {
                return fn(this.state)
            }
            Object.defineProperty(this.getters, key, {
                get: () => {
                    // return getters[key](this.state);
                    return this.vm[key];
                }
            })
        })


        this.vm = new Vue({
            // 以$开头的属性 不会定义在vm上
            data: {
                $$state: state
            },
            computed,
        })

        this.mutations = {}
        forEachValue(mutations, (fn, key) => {
            // store.commit("key",payload) -> store.mutations[key] = (payload) => {}
            this.mutations[key] = (payload) => {
                return fn(this.state, payload)
            }
        })

        this.actions = options.actions;
        forEachValue(actions, (fn, key) => {
            // store.dispatch("key",payload) -> store.actions[key] = ({commit}:context,payload) => {}
            this.actions[key] = (payload) => fn(this, payload)
        })

        const { commit, dispatch } = this
        this.commit = (type, payload) => {
            return commit.call(this, type, payload)
        }

        this.dispatch = (type, payload) => {
            return dispatch.call(this, type, payload)
        }
    }

    get state() {
        return this.vm._data.$$state
    }

    commit(type, payload) {
        this.mutations[type](payload)
    }

    dispatch(type, payload) {
        this.actions[type](payload)
    }
}

// 原理：在根组件中注册一个插件，提供install方法
const Vuex = {
    Store,
    install(_Vue) {
        // 需要获取到父组件中定义的store属性，每个组件运行都时候都能拿到store
        Vue = _Vue
        Vue.mixin({
            beforeCreate() {
                const options = this.$options;
                // 根组件
                if (options.store) {
                    this.$store = options.store
                } else {
                    // 子组件和平级组件(排除掉平级组件)
                    if (this.$parent && this.$parent.$store) {
                        this.$store = this.$parent.$store
                    }
                }
                // console.log(this.$options,"****");
            }
        })
    }
}

export default Vuex