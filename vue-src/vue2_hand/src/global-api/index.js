import {mergeOptions} from '../util';
import initExtend from './extend';

export function initGlobalApi(Vue) {
    Vue.options = {};  // Vue.components Vue.directive
    Vue.mixin = function (mixin) {
        // 合并对象  (先考虑生命周期) 不考虑其他的合并  data computed watch methods
        this.options = mergeOptions(this.options, mixin);// 第一次父亲空对象  ({},mixin);
        // console.log(this.options);// this.options = {created:[a,b]}
    };
    // Vue.options,options
    // 用户 new Vue({created(){}})
    // 内部每次混合的时候 将每个方法制作一个队列

    Vue.options.components = {}; // 全局组件
    Vue.options._base = Vue; // _base 最终的Vue的构造函数 保留在options对象中

    initExtend(Vue);

    Vue.component = function (id, definition) {
        // Vue.extend
        definition.name = definition.name || id;// 默认会以name属性为准
        //  根据当前组件对象  生成了一个子类的构造函数
        //  用的时候 new definition().$mount();
        definition = this.options._base.extend(definition); // this -> Vue

        Vue.options.components[id] = definition;
    }
}