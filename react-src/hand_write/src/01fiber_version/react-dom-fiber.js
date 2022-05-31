import { TAG_ROOT } from './constants'
import { scheduleRoot } from './schedule'

/**
 * @description 把一个元素渲染到容器内部
 * @param {*} element
 * @param {*} container  = root DOM节点
 */
export function render(element, container) {
  let rootFiber = {
    tag: TAG_ROOT, // s's's 每一个fiber都会有一个tag标识 此元素的类型
    stateNode: container, // 一般情况下如果这个元素是一个原生节点，stateNode指向真实DOM元素
    // props.children是一个数组 存放的是react元素 -> 虚拟DOM 之后会根据每个react元素创建对应的fiber
    props: { children: [element] }, // 这个fiber的children属性 存放的是要渲染的元素
  }
  scheduleRoot(rootFiber)
}

const ReactDOM = {
  render,
}

export default ReactDOM
