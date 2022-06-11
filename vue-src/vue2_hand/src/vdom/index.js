import { isReservedTag } from '../util'

export function renderMixin(Vue) {
    Vue.prototype._render = function () {
        const vm = this;
        const render = vm.$options.render;
        // _c('div',{id:"app",style:{"color":"red"}},_c('div',undefined,_v("hello"+_s(version)+"world"+_s(arr)),_c('span',undefined,_v("world"))))
        // console.log(render);
        let vnode = render.call(vm);
        // console.log("vnode: ",vnode);
        /*
        {tag: "div", data: {…}, key: undefined, children: Array(1), text: undefined}
        children: [{…}]
        data: {id: "app", style: {…}}
        key: undefined
        tag: "div"
        */
        return vnode;
    };

    Vue.prototype._c = function () { // 创建虚拟dom元素
        // console.log(arguments);
        return createElement(this, ...arguments);
    };

    // 当结果是对象时 会对这个对象取值
    Vue.prototype._s = function (val) { // {{}} stringify
        return val == null ? '' : (typeof val === 'object') ? JSON.stringify(val) : val;
    };

    Vue.prototype._v = function (text) { // 创建虚拟dom文本
        // console.log(text);
        return createTextNode(text);
    };
}

function createElement(vm, tag, data = {}, ...children) {
    //  如果是组件 产生虚拟节点时 需要将组件的构造函数传入
    //  根据tag名 需要判断是否是一个组件
    if (isReservedTag(tag)) {
        return vnode(tag, data, data.key, children);
    } else {
        let Ctor = vm.$options.components[tag];
        //  创建组件的虚拟节点
        return createComponent(vm, tag, data, data.key, children, Ctor)
    }
}

function createComponent(vm, tag, data, key, children, Ctor) {
    const baseCtor = vm.$options._base; // Vue
    if (typeof Ctor == 'object') {
        Ctor = baseCtor.extend(Ctor);
    }
    //  给组件增加生命周期
    data.hook = { // 稍后初始化组件时  会调用init方法
        init(vnode) {
            // vnode.componentInstance 当前组建的额真实dom
            let child = vnode.componentInstance = new Ctor({});// vm.$el
            child.$mount(); // 挂载逻辑 组件的$mount方法中不传递参数
        }
    };

    let component = vnode(`vue-component-${Ctor.cid}-${tag}`, data, key, undefined, undefined, { Ctor, children })
    console.log(component, 123);
    return component
}

function createTextNode(text) {
    return vnode(undefined, undefined, undefined, undefined, text);
}

// 用来生成虚拟dom 一个js对象，可以自定义属性
// ast是通过源代码转化生成来的，不能新增属性
function vnode(tag, data, key, children, text, componentOptions) {
    return {
        tag,
        data,
        key, // dom-diff 算法比较唯一标识
        children,
        text,
        componentOptions // 组件的虚拟节点多了componentOptions属性 用来保存当前组件的构造函数和他的插槽
    }
}