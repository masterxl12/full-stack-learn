import { patch } from "./vdom/patch";
import Watcher from "./observe/watcher";

export function lifecycleMixin(Vue) {
    /**
     * 虚拟dom变成真实dom进行渲染，后续更新也调用此方法
     * @param {*} vnode 
     */
    Vue.prototype._update = function (vnode) {
        const vm = this;
        const prevVnode = vm._vnode; // 首次渲染 _vnode存在
        if (!prevVnode) {
            //  用新的创建的元素 替换老的vm.$el
            //  这里需要区分 到底是首次渲染还是更新
            vm.$el = patch(vm.$el, vnode);
        } else {
            //  用上一次的vnode 和 本次做对比
            vm.$el = patch(prevVnode, vnode);
        }
        vm._vnode = vnode; // 保存第一次的vnode
    }

    // // 调用编译后的render方法，生成虚拟节点
    // Vue.prototype._render = function () {
    //     const vm = this;
    //     let { render } = vm.$options;
    //     let vnode = render.call(vm);
    //     return vnode;
    // }
}

export function mountComponent(vm, el) {
    // 1. 调用render方法渲染el属性
    // console.log(vm.$options.render);

    callHook(vm, 'beforeMount');
    let updateComponent = () => {
        // 1. vm._render() -> 先把当前模板渲染成虚拟节点 
        // 2. 再把虚拟dom创建真实dom 替换掉原有的el
        vm._update(vm._render());
    };

    // 2. 先调用render方法创建虚拟节点，在将虚拟节点渲染到页面上
    // vm._render() -> vnode -> 将虚拟节点更新到真实节点 进行渲染

    // ! 3. watcher是用于渲染的 目前没有任何功能
    // 初始化就会创建
    let watcher = new Watcher(vm, updateComponent, () => {
        callHook(vm, 'updated')
    }, true);


    //  要把属性和water绑定在一起

    // setTimeout(() => {
    //     watcher.get();
    // }, 2000);

    callHook(vm, 'mounted');
}

/**
 * 生命周期钩子函数 通过mixin混入后 实际上是一个数组 [f,f,f,...]
 * @param {*} vm 
 * @param {*} hook 
 */
export function callHook(vm, hook) {
    const handlers = vm.$options[hook];
    handlers && handlers.forEach(handler => handler.call(vm))
}