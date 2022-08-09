import { ELEMENT_TEXT } from './constants'
import Component from './component'
import { UpdateQueue, Update } from './UpdateQueue'
import { scheduleRoot } from './schedule'

/**
 * 创建元素（虚拟DOM）
 * @param {} type 元素的类型 div span p
 * @param {*} config 配置对象 属性 key ref
 * @param  {...any} children 放着所有的儿子，做成一个数组。->不使用展开运算符... 考虑到没有儿子或者是一个儿子的情况 同源码保持一致
 */
function createElement(type, config, children) {
  let ref;
  // 删除不必要的属性，简化代码
  if (config) {
    delete config.__self
    delete config.__source
    ref = config.ref
  }
  let props = { ...config }
  if (arguments.length > 3) {
    children = Array.prototype.slice.call(arguments, 2)
  }
  props.children = children
  return {
    type,
    props,
    ref
  }
}

function createRef() {
  return {
    current: null
  }
}

function forwardRef(FunctionComponent) {
  return class extends Component {
    render() {
      return FunctionComponent(this.props, this.props.ref)
    }
  }
}

function createContext() {
  let value;
  function Provider(props) {
    value = props.value;
    return props.children
  }

  function Consumer(props) {
    return props.children(value);
  }

  return {
    Provider,
    Consumer
  }
}

export default {
  createElement,
  Component,
  createRef,
  forwardRef,
  createContext
}
