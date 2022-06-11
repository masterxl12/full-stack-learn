// new Vue({})

import {initMixin} from './init';
import {stateMixin} from './state';
import {renderMixin} from "./vdom/index";
import {lifecycleMixin} from "./lifecycle";
import {initGlobalApi} from "./global-api/index";


function Vue(options) {
    this._init(options);// 入口方法，做初始化操作
}

//  原型方法
// 写成一个个的插件对原型进行扩展
initMixin(Vue);      // init()
renderMixin(Vue);    // _render() 先调用render方法创建虚拟节点
lifecycleMixin(Vue); // _update() 混合生命周期 渲染
stateMixin(Vue);

//  静态方法
initGlobalApi(Vue);

/*              dom-diff-start                               */
/*
// 创建两个虚拟dom 模拟dom-diff操作
import {compileToFunctions} from './compiler/index'
import {createEle, patch} from "./vdom/patch"

let vm1 = new Vue({data: {name: 'zs'}});
let render1 = compileToFunctions(`<div>
    <li key="A" style="background: #2aa198">A</li>
    <li key="B" style="background: #1980aa">B</li>
    <li key="C" style="background: #2a0198">C</li>
    <li key="D" style="background: #ffa200">D</li>
    <li key="F" style="background: #ffa200">F</li>
</div>`);
let vNode1 = render1.call(vm1);// render 方法返回虚拟dom

document.body.appendChild(createEle(vNode1));

let vm2 = new Vue({data: {name: 'ls'}});
let render2 = compileToFunctions(`<div>
    <li key="M" style="background: #2a0198">M</li>
    <li key="B" style="background: #1980aa">B</li>
    <li key="A" style="background: #2aa198">A</li>
    <li key="Q" style="background: purple">Q</li>
</div>`);
let vNode2 = render2.call(vm2);

// 用新的虚拟节点对比老的虚拟节点 找到差异 去更新老的dom元素
setTimeout(() => {
    patch(vNode1, vNode2); // 传入老的虚拟节点 新的虚拟节点
}, 1000);
*/
/*              dom-diff-end                              */

export default Vue;



