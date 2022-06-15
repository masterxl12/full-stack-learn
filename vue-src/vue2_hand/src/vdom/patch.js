//  将虚拟节点转化成真实节点
/**
 * 既有渲染功能 又有更新功能
 * @param oldVnode  老的虚拟节点
 * @param vnode     新的虚拟节点
 * @returns {*}
 */
export function patch(oldVnode, vnode) {

    if (!oldVnode) { // 如果是组件 这个vnode 是undefined
        return createEle(vnode);
    }

    // 1. 默认初始化时  
    // 1.1 渲染阶段 是直接用虚拟节点创建出真实节点来 替换掉老节点
    if (oldVnode.nodeType === 1) { // 渲染功能
        // console.log(oldVnode, vnode);
        // console.log(oldVnode.parentNode);
        // console.log(oldVnode.nextSibling);
        let el = createEle(vnode); // 产生真实的dom
        let parentElm = oldVnode.parentNode; // 获取老的app父亲 -> body
        // 当前的真实元素 插入到app的后面
        parentElm.insertBefore(el, oldVnode.nextSibling);
        parentElm.removeChild(oldVnode); // 删除老的节点
        return el;
    } else {
        // 1.2 更新功能
        // 在更新时 用老的虚拟节点 和 新的虚拟节点做对比  将不同的地方更新为真实dom
        // console.log(oldVnode, vnode, oldVnode.el);
        // 1. 比较两个元素的标签 标签不一样直接替换掉即可
        if (oldVnode.tag !== vnode.tag) {
            return oldVnode.el.parentNode.replaceChild(createEle(vnode), oldVnode.el);
        }

        // 2. 有可能是标签一样
        // 文本节点的虚拟节点tag 都是undefined
        if (!oldVnode.tag) { // 2. oldVnode.tag === vnode.tag 文本的比对
            if (oldVnode.text !== vnode.text) {
                return oldVnode.el.textContent = vnode.text;
            }
        }

        // 3. 标签一样 并且需要开始比对标签的属性 和 儿子
        //    标签一样 直接复用即可
        let el = vnode.el = oldVnode.el; // 复用老节点
        //    更新属性 用新的虚拟节点的属性和老的比较 去更新节点
        updateProperties(vnode, oldVnode.data);

        //  儿子比较 分为几种情况
        //  老的有儿子 新的没儿子
        //  老的没儿子 新的有儿子

        //  老的有儿子 新的有儿子
        let newVnodeChildren = vnode.children || [];
        let oldVnodeChildren = oldVnode.children || [];
        // debugger;
        if (newVnodeChildren.length > 0 && oldVnodeChildren.length > 0) {//  老的有儿子 新的有儿子
            updateChildren(oldVnode.children, vnode.children, el);
        } else if (oldVnodeChildren.length > 0) { //  老的有儿子 新的没儿子
            el.innerHTML = '';
        } else if (newVnodeChildren.length > 0) {//  老的没儿子 新的有儿子
            for (let i = 0; i < vnode.length; i++) {
                let childNode = vnode.children[i];
                el.appendChild(createEle(childNode));
            }
        }
    }
    // oldVnode => id#app  vnode 根据模板产生虚拟dom
}

function createComponent(vnode) {
    debugger;
    let i = vnode.data;
    if ((i = i.hook) && (i = i.init)) {
        i(vnode); // 内部会new 组件 会将实例挂载在vnode上
    }

    if (vnode.componentInstance) {
        return true;
    }
}

export function createEle(vnode) {
    let { tag, data, children, text, key } = vnode;
    if (typeof tag === 'string') { // 创建元素 放到vnode.el 上

        if (createComponent(vnode)) { // 组件渲染后的结果 放到当前组件的实例上
            return vnode.componentInstance.$el;
        }

        vnode.el = document.createElement(tag);
        // 元素标签存在属性
        updateProperties(vnode);

        children.forEach(child => {
            // 遍历儿子 将儿子渲染后的结果扔到父亲中
            vnode.el.appendChild(createEle(child));
        })
    } else { // 创建文本 放到vnode.el上
        vnode.el = document.createTextNode(text);
    }

    return vnode.el;
}

// 更新属性  比对差异 尽可能复用老的 新的有
/**
 *
 * @param vnode     新的虚拟dom
 * @param oldProps  老的虚拟dom属性
 */
function updateProperties(vnode, oldProps = {}) {
    let newProps = vnode.data || {};
    let el = vnode.el;
    // console.log(el);

    // 老的有 新的没有 需要删除属性
    for (let key in oldProps) {
        if (!newProps[key]) {
            el.removeAttribute(key);// 移除真实dom的属性
        }
    }
    // 样式处理 style= {color:red} 新的 style={background:red}
    let newStyle = newProps.style || {};
    let oldStyle = oldProps.style || {};
    // 老的样式中有 删除老的
    for (let key in oldStyle) {
        if (!newStyle[key]) {
            el.style[key] = ''
        }
    }

    // 新的有 直接用新的去做更新即可
    for (let key in newProps) {
        if (key === 'style') {
            Object.entries(newProps[key]).forEach(([key, value]) => {
                el.style[key] = value;
            })
        } else if (key === 'class') {
            el.className = newProps.class;
        } else {
            el.setAttribute(key, newProps[key])
        }
        // TODO 事件监听等处理逻辑
    }
}

function updateChildren(oldChildren, newChildren, parent) { // 双指针
    let oldStartIndex = 0;// 老的索引
    let oldStartVnode = oldChildren[0]; // 老的索引指向的节点
    let oldEndIndex = oldChildren.length - 1;// 老的结束索引
    let oldEndVnode = oldChildren[oldEndIndex]; // 老的结束索引指向的节点

    let newStartIndex = 0;// 老的索引
    let newStartVnode = newChildren[0]; // 老的索引指向的节点
    let newEndIndex = newChildren.length - 1;// 老的结束索引
    let newEndVnode = newChildren[newEndIndex]; // 老的结束索引指向的节点

    //    vue中diff算法做了很多优化

    //    DOM中操作有很多常见的逻辑 把节点插入到当前儿子的头部、尾部、儿子倒序正序

    //    vue2中采用的是双指针的方式

    //    在尾部添加

    //    做一个循环 同时循环老的和新的  哪个先结束 循环就停止 将多余的删除或者添加进去
    //    比较谁先循环停止

    function makeIndexByKey(children) {
        let map = {};
        children.forEach((item, index) => {
            if (item.key) {
                map[item.key] = index
            }
        });
        return map;
    }

    let map = makeIndexByKey(oldChildren);

    while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
        if (!oldStartVnode) { // 当前老节点oldStartVnode指向null 向后移动
            oldStartVnode = oldChildren[++oldStartIndex];
        } else if (!oldEndVnode) { // 当前老节点oldEndVnode指向null 向后移动
            oldEndVnode = oldChildren[--oldEndIndex];
        } else if (isSameVnode(oldStartVnode, newStartVnode)) {
            // 老的头 和 新的头 相同
            // 老 -> a b c d
            // 新 -> a b c d e
            // 如果两人是同一个元素，比对儿子
            patch(oldStartVnode, newStartVnode); // 更新属性和再去递归更新子节点
            oldStartVnode = oldChildren[++oldStartIndex];
            newStartVnode = newChildren[++newStartIndex];
            // 老的尾 和 新的尾 相同
            // 老 -> a b c d
            // 新 -> e a b c d
        } else if (isSameVnode(oldEndVnode, newEndVnode)) {
            patch(oldEndVnode, newEndVnode); // 更新属性和再去递归更新子节点
            oldEndVnode = oldChildren[--oldEndIndex];
            newEndVnode = newChildren[--newEndIndex];
            // 老的头 和 新的尾 相同
            // 老 -> a b c d
            // 新 -> d c b a
        } else if (isSameVnode(oldStartVnode, newEndVnode)) {
            patch(oldStartVnode, newEndVnode);
            // 将当前元素插入到尾部的下一个元素的前面
            parent.insertBefore(oldStartVnode.el, oldEndVnode.el.nextSibling);
            oldStartVnode = oldChildren[++oldStartIndex];
            newEndVnode = newChildren[--newEndIndex];
            // 老的尾 和 新的头 相同
            // 老 -> a b c d
            // 新 -> d a b c
        } else if (isSameVnode(oldEndVnode, newStartVnode)) {
            patch(oldEndVnode, newStartVnode);
            parent.insertBefore(oldEndVnode.el, oldStartVnode.el);
            oldEndVnode = oldChildren[--oldEndIndex];
            newStartVnode = newChildren[++newStartIndex];
            //  为什么要有key  循环的时候为什么不能用index 作为key
        } else {
            //  儿子之间没有关系  暴力比对
            let movedIndex = (newStartVnode.key && map[newStartVnode.key]); // 拿到开头的虚拟节点的key 去老的中找

            if (movedIndex == undefined) { // 新的节点key 在老节点中不存在
                parent.insertBefore(createEle(newStartVnode), oldStartVnode.el);
            } else {
                // 新的节点key 在老节点中存在 -> 需要复用
                console.log(movedIndex);
                let moveVNode = oldChildren[movedIndex];// 这个老的的虚拟节点需要移动
                oldChildren[movedIndex] = null; // 避免老节点数组塌陷
                parent.insertBefore(moveVNode.el, oldStartVnode.el);
                patch(moveVNode, newStartVnode); // 需要比对属性 和儿子 是否一致
            }
            newStartVnode = newChildren[++newStartIndex];
        }
    }

    // 新的移动结束
    if (newStartIndex <= newEndIndex) {
        for (let i = newStartIndex; i <= newEndIndex; i++) {
            //  将新的多余的插入即可  可能是向前添加 还有可能是向后添加
            //  parent.appendChild(createEle(newChildren[i]));
            //  向后插入 ele = null
            //  向前插入 ele 就是当前向谁前面插入
            let ele = (newChildren[newEndIndex + 1] == null) ? null : newChildren[newEndIndex + 1].el;
            parent.insertBefore(createEle(newChildren[i]), ele);// ele 为null insertBefore 会变成appendChild
        }
    }

    // 老的节点还有没处理的 说明这些老节点是不需要的节点  如果这里面有null 说明这个节点已经被处理过 直接跳过即可
    if (oldStartIndex <= oldEndIndex) {
        for (let i = oldStartIndex; i <= oldEndIndex; i++) {
            if (!!oldChildren[i]) {
                parent.removeChild(oldChildren[i].el);
            }
        }
    }
}

// 判断两个节点是否是同一虚拟节点
/**
 *
 * @param oldVnode              老虚拟节点
 * @param newVnode              新虚拟节点
 * @returns {boolean|boolean}
 */
function isSameVnode(oldVnode, newVnode) {
    return (oldVnode.tag === newVnode.tag) && (oldVnode.key === newVnode.key)
}


