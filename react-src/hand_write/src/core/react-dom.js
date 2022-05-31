// 虚拟DOM的渲染
import { addEvent } from './event'
/**
 * 把virtualDOM转成真实DOM并且插入到parentDOM中
 * @param virtualDOM 虚拟DOM
 * @param parentDOM 真实DOM
 */
function render(virtualDOM, parentDOM) {
  let dom = virtualDOM && createDOM(virtualDOM)
  virtualDOM && parentDOM.appendChild(dom)
}

/**
 * 把虚拟DOM转成真实DOM并且插入到页面中
 * @param virtualDOM
 */
export function createDOM(virtualDOM) {
  if (typeof virtualDOM === 'string' || typeof virtualDOM === 'number') {
    return document.createTextNode(virtualDOM)
  }
  let { type, props, ref } = virtualDOM
  let dom
  // 1. 判断是函数组件、类组件、原生标签节点（如span、div）
  if (typeof type === 'function') {
    // 类组件通过babel编译后也是function，需要进一步判断是类组件还是函数组件
    return type.prototype && type.prototype.isReactComponent ? updateClassComponent(virtualDOM) :
      updateFunctionComponent(virtualDOM) // 函数式组件
  } else {
    // 如果类型是普通字符串 说明是原生DOM节点
    dom = document.createElement(type)
  }
  // 2. 节点挂载className、style等属性
  updateProps(dom, props)
  // 3. 对props.children的处理
  if (typeof props.children === 'string' || typeof props.children === 'number') {
    // props: {children:'hello'}
    dom.textContent = props.children
  } else if (typeof props.children === 'object' && !Array.isArray(props.children)) {
    // props: {children:{type:'div',children:'world'}}
    // 如果儿子是一个对象(虚拟DOM)，并且不是数组
    render(props.children, dom)
  } else if (Array.isArray(props.children)) {
    // 如果儿子是一个数组
    reconcileChildren(props.children, dom)
  } else {
    dom.textContent = props.children ? props.children.toString() : ''
  }
  if (ref) {
    ref.current = dom
  }
  return dom
}

/**
 * 处理儿子
 * @param children
 * @param parentDOM
 */
function reconcileChildren(children, parentDOM) {
  // 把每一个儿子都从虚拟DOM变成真实DOM并且插入到父节点中去
  for (let i = 0; i < children.length; i++) {
    render(children[i], parentDOM)
  }
}

/**
 * 把props上的属性赋值给真实DOM元素 此方法不支持对children的处理
 * @param dom
 * @param props
 */

export function updateProps(dom, newProps = {}) {
  for (let key in newProps) {
    if (key === 'children') {
      continue;
    } else if (key === 'style') {
      let styleObj = newProps[key];
      for (let attr in styleObj) {
        dom.style[attr] = styleObj[attr];
      }
    } else if (key.startsWith('on')) {
      addEvent(dom, key.toLocaleLowerCase(), newProps[key]);
    } else {
      dom[key] = newProps[key];
    }
  }
  // for (let key in oldProps) {
  //   if (!newProps.hasOwnProperty(key)) {
  //     dom[key] = null;
  //   }
  // }
}

// 更新函数组件
function updateFunctionComponent(virtualDOM) {
  let { type, props } = virtualDOM
  let renderVirtualDOM = type(props)
  return createDOM(renderVirtualDOM)
}

// 更新类组件
function updateClassComponent(virtualDOM) {
  let { type: ComponentClass, props, ref } = virtualDOM
  // -----------------------1.创建类组件实例--------------------------
  let classInstance = new ComponentClass(props)
  // ------------------ 2.挂载前调用componentWillMount ---------------
  if (classInstance.componentWillMount) {
    classInstance.componentWillMount()
  }
  if (ref) {
    ref.current = classInstance
  }
  //-------------------3.挂载类组件实例到DOM---------------------------
  let renderVirtualDOM = classInstance.render()
  // console.log("renderVirtualDOM", renderVirtualDOM);
  // 把此虚拟DOM 赋给classInstance.oldVdom
  classInstance.oldVdom = renderVirtualDOM;
  // 在类的实例身上挂一个属性DOM，指向此类实例对应的真实DOM
  let dom = createDOM(renderVirtualDOM)
  // ------------------ 4.挂载后调用componentDidMount ----------------
  if (classInstance.componentDidMount) {
    classInstance.componentDidMount()
  }
  classInstance.dom = dom
  return dom
}
const ReactDOM = {
  render,
}
export default ReactDOM
