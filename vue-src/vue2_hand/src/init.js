import { initState } from "./state";
import { compileToFunctions } from "./compiler/index";
import { mountComponent, callHook } from "./lifecycle";
import { mergeOptions } from './util'

export function initMixin(Vue) {
    Vue.prototype._init = function (options) {
        let vm = this;

        // 需要将用户自定义的options 和 全局的options做合并
        // vm.$options = options; // Vue实例对象存在$options 属性
        console.log(vm.constructor.options, options);
        vm.$options = mergeOptions(vm.constructor.options, options);
        // console.log(vm.$options);
        // 初始化状态  (将数据做一个初始化的劫持 当我改变数据时应该更新视图)
        // vue组件有很多状态 data props  watch computed

        callHook(vm, 'beforeCreate');
        initState(vm);
        callHook(vm, 'created');
        // vue里面核心特性 响应式数据原理

        // MVVM 数据变化驱动视图更新，视图变化数据会被影响，不能跳过数据去更新视图。
        // Vue可以直接操作DOM ($ref,更新dom元素)

        // ! 如果当前有el属性说明要渲染模板
        if (vm.$options.el) {
            vm.$mount(vm.$options.el);
        }
    };

    Vue.prototype.$mount = function (el) {
        // 挂载操作
        let vm = this;
        let options = vm.$options;
        el = document.querySelector(el);
        vm.$el = el;
        if (!options.render) {
            //  2. 没有render 将template转化成render方法
            let template = options.template;
            // 3. 没有模板，就采用指定元素对应的模板
            if (!template && el) {
                // 带所有的html，包裹元素包含在内
                template = el.outerHTML;
            }
            // 编译原理  将模板编译成render函数
            const render = compileToFunctions(template); //  模板编译
            options.render = render;
        }
        // 渲染时调用的都是这个render方法
        // 1. 有render方法

        // 需要挂载组件 
        // 根据render方法产生虚拟节点 ，再将虚拟节点变成真实节点 插入到页面中
        mountComponent(vm, el);
        // console.log(options.render);
    }
}