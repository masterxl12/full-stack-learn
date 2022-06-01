import { REACT_TEXT, REACT_FORWARD_REF_TYPE, PLACEMENT, MOVE, REACT_FRAGMENT } from "./constants/domDiff";
import { createDOM, updateProps } from './react-dom'
import { isFunction } from './utils'
// 定义并导出一个updateQueue更新队列
export let updateQueue = {
  updaters: [], // 更新器数组，默认是一个空数组
  // 是否处于批量更新模式
  isBatchingUpdate: false,
  // 添加更新器
  add(updater) {
    this.updaters.push(updater)
  },
  // 批量更新方法
  // 先通过add方法添加updater，然后在合适的时候调用这个批量更新方法，一次性全部更新updater
  batchUpdate() {
    this.isBatchingUpdate = true
    // 把数组中的updaters全部取出，进行批量或者全量更新
    this.updaters.forEach((update) => update.updateComponent())
    this.updaters.length = 0
    this.isBatchingUpdate = false //设置为非批量更新模式
  },
}

// 更新器
class Updater {
  constructor(classInstance) {
    this.classInstance = classInstance // 类组件实例
    this.pendingStates = [] //定义数组 用来缓存所有的状态
  }
  addState(partialState) {
    // 先把分状态或者更新函数放在数组中进行缓存
    this.pendingStates.push(partialState)
    this.emitUpdate();
    // 判断当前是否处于批量更新模式(异步)，如果是，则先添加更新队列去等待更新
    // 否则说明处于非批量更新模式(同步)，直接更新组件
    // updateQueue.isBatchingUpdate ? updateQueue.add(this) : this.updateComponent()
  }
  emitUpdate(nextProps) {
    this.nextProps = nextProps;
    if (this.classInstance.componentWillReceiveProps) {
      this.classInstance.componentWillReceiveProps(nextProps);
    }
    // 如果传入新的属性 或者当前不是处于批量更新模式
    if (this.nextProps || !updateQueue.isBatchingUpdate) {
      this.updateComponent()
    } else {
      updateQueue.add(this)
    }
  }
  // 组件进行更
  updateComponent() {
    // updater里的类组件实例和数组中的状态
    let { classInstance, pendingStates, nextProps } = this
    // 如果属性变化 或者状态发生变化，则需要更新，否则不更新
    if (pendingStates.length > 0) {
      shouldUpdate(classInstance, nextProps, this.getState());
      /*
      // 从pendingStates中获取新的状态
      classInstance.state = this.getState()
      // 重新渲染，更新处理
      classInstance.forceUpdate()
      */
    }
  }

  getState() {
    let { classInstance, pendingStates } = this
    // 组件实例中的状态
    let { state } = classInstance
    // if (pendingStates.length > 0) {
    //   let nextState = state;
    //   pendingStates.forEach(partialState => {
    //     if (isFunction(partialState)) {
    //       nextState = { ...nextState, ...partialState(nextState) };
    //     } else {
    //       nextState = { ...nextState, ...partialState }
    //     }
    //   })
    //   pendingStates.length = 0
    //   return nextState
    // }
    let nextState = pendingStates.reduce((nextState, partialState) => {
      let tempState = isFunction(partialState) ? partialState(nextState) : partialState
      return { ...nextState, ...tempState }
    }, state)
    pendingStates.length = 0
    return nextState
  }
}

function shouldUpdate(classInstance, nextProps, nextState) {
  // 不管要不要重新刷新组件 其实内部的状态和属性已经是最新的
  classInstance.props = nextProps || classInstance.props;
  classInstance.state = nextState || classInstance.state;
  // 如果有shouldComponentUpdate方法，并且返回值是false
  if (classInstance.shouldComponentUpdate && (!classInstance.shouldComponentUpdate(nextProps, nextState))) {
    return
  }
  // 如果没有shouldComponentUpdate 或者返回值为true 则需要更新
  classInstance.forceUpdate();
}

class Component {
  constructor(props) {
    this.props = props
    this.state = {}
    this.$updater = new Updater(this)
  }

  // 只放跟新的状态
  setState(partialState) { // 分状态
    this.$updater.addState(partialState)
  }

  // 让这个组建的状态改变后，重新render，得到新的虚拟dom，然后从新的虚拟dom得到新的真实DOM
  // 然后用新的真实DOM替换老的真实DOM就可以实现更新
  forceUpdate() {
    if (this.componentWillUpdate) {
      this.componentWillUpdate()
    }
    let newVirtualDOM = this.render();
    // 这个生命周期的功能实际上就是将传入的props映射到state上面
    if (newVirtualDOM.type.getDerivedStateFromProps) {
      let newState = newVirtualDOM.type.getDerivedStateFromProps(this.props, this.state)
      if (newState) {
        this.state = { ...this.state, ...newState }
      }
    }
    // getSnapshotBeforeUpdate() 被调用于render之后，可以读取但无法使用DOM的时候。它使您的组件可以在可能更改之前从DOM捕获一些信息（例如滚动位置）。
    // 此生命周期返回的任何值都将作为参数传递给componentDidUpdate()
    let snapshot = this.getSnapshotBeforeUpdate && this.getSnapshotBeforeUpdate()
    // compareTwoVdom(this.oldVdom,newVirtualDOM)
    let newDOM = createDOM(newVirtualDOM);
    let oldDOM = this.dom;
    // 把老的dom替换成新的dom
    oldDOM.parentNode.replaceChild(newDOM, oldDOM);
    this.dom = newDOM;
    if (this.componentDidUpdate) {
      this.componentDidUpdate(this.props, this.state, snapshot);
    }
  }
}

export function compareTwoVdom(oldVnode, newVnode) {
  // 新老都没有
  if (!oldVnode && !newVnode) {
    return newVnode
  }
  // 老的有 新的没有
  else if (oldVnode && !newVnode) {
    let currentDOM = oldVnode.dom;
    currentDOM.parentNode.removeChild(currentDOM)
    if (oldVnode.classInstance.componentWillUnmount) {
      oldVnode.classInstance.componentWillUnmount()
    }
    return null;
  }
  // 老的没有 新的有
  else if (!oldVnode && newVnode) {
    let newDOM = createDOM(newVnode);
    newVnode.dom = newDOM;
    return newVnode
  }
  // 新老节点都有,但是类型不同，也不能复用，建立新的
  else if (oldVnode && newVnode && (oldVnode.type !== newVnode.type)) {
    let currentDOM = oldVnode.dom;
    let newDOM = createDOM(newVnode);
    newDOM.dom = newDOM;
    currentDOM.parentNode.replaceChild(newDOM, currentDOM);
    if (oldVnode.classInstance.componentWillUnmount) {
      oldVnode.classInstance.componentWillUnmount()
    }
    return newVnode;
  }
  // 新老节点都有 且type一样
  else {
    // 深度比较
    updateElement(oldVnode, newVnode);
    return newVnode;
  }
}

function updateElement(oldVdom, newVdom) {
  if (oldVdom.type === REACT_TEXT) {
    let currentDOM = newVdom.dom = findDOM(oldVdom);
    if (oldVdom.props !== newVdom.props) {
      currentDOM.textContent = newVdom.props;
    }
    return;
  } else if (typeof oldVdom.type === 'string') {
    let currentDOM = newVdom.dom = findDOM(oldVdom);
    updateProps(currentDOM, oldVdom.props, newVdom.props);
    updateChildren(currentDOM, oldVdom.props.children, newVdom.props.children);
  } else if (oldVdom.type === REACT_FRAGMENT) {
    newVdom = document.createDocumentFragment();
  } else if (typeof oldVdom.type === 'function') {
    if (oldVdom.type.isReactComponent) {
      updateClassComponent(oldVdom, newVdom);
    } else {
      updateFunctionComponent(oldVdom, newVdom);
    }
  }
}

function updateFunctionComponent(oldVdom, newVdom) {
  let currentDOM = findDOM(oldVdom);
  if (!currentDOM) return;
  let parentDOM = currentDOM.parentNode;
  let { type, props } = newVdom;
  let newRenderVdom = type(props);
  compareTwoVdom(parentDOM, oldVdom.oldRenderVdom, newRenderVdom);
  newVdom.oldRenderVdom = newRenderVdom;
}

function updateClassComponent(oldVdom, newVdom) {
  let classInstance = newVdom.classInstance = oldVdom.classInstance;
  if (classInstance.componentWillReceiveProps) {
    classInstance.componentWillReceiveProps();
  }
  classInstance.updater.emitUpdate(newVdom.props);
}

function updateChildren(parentDOM, oldVChildren, newVChildren) {
  oldVChildren = (Array.isArray(oldVChildren) ? oldVChildren : [oldVChildren]).filter(item => item) || [];
  newVChildren = (Array.isArray(newVChildren) ? newVChildren : [newVChildren]).filter(item => item) || [];
  let keyedOldMap = {};
  let lastPlacedIndex = 0;
  oldVChildren.forEach((oldVChild, index) => {
    let oldKey = oldVChild.key ? oldVChild.key : index;
    keyedOldMap[oldKey] = oldVChild;
  });
  let patch = [];
  newVChildren.forEach((newVChild, index) => {
    newVChild.mountIndex = index;
    let newKey = newVChild.key ? newVChild.key : index;
    let oldVChild = keyedOldMap[newKey];
    if (oldVChild) {
      updateElement(oldVChild, newVChild);
      if (oldVChild.mountIndex < lastPlacedIndex) {
        patch.push({
          type: MOVE,
          oldVChild,
          newVChild,
          mountIndex: index
        });
      }
      delete keyedOldMap[newKey];
      lastPlacedIndex = Math.max(lastPlacedIndex, oldVChild.mountIndex);
    } else {
      patch.push({
        type: PLACEMENT,
        newVChild,
        mountIndex: index
      });
    }
  });
  let moveVChild = patch.filter(action => action.type === MOVE).map(action => action.oldVChild);
  Object.values(keyedOldMap).concat(moveVChild).forEach((oldVChild) => {
    let currentDOM = findDOM(oldVChild);
    parentDOM.removeChild(currentDOM);
  });
  patch.forEach(action => {
    let { type, oldVChild, newVChild, mountIndex } = action;
    let childNodes = parentDOM.childNodes;
    if (type === PLACEMENT) {
      let newDOM = createDOM(newVChild);
      let childNode = childNodes[mountIndex];
      if (childNode) {
        parentDOM.insertBefore(newDOM, childNode);
      } else {
        parentDOM.appendChild(newDOM);
      }
    } else if (type === MOVE) {
      let oldDOM = findDOM(oldVChild);
      let childNode = childNodes[mountIndex];
      if (childNode) {
        parentDOM.insertBefore(oldDOM, childNode);
      } else {
        parentDOM.appendChild(oldDOM);
      }
    }
  });
}

export function findDOM(vdom) {
  if (!vdom) return null;
  if (vdom.dom) {//vdom={type:'h1'}
    return vdom.dom;
  } else {
    let renderVdom = vdom.classInstance ? vdom.classInstance.oldRenderVdom : vdom.oldRenderVdom;
    return findDOM(renderVdom);
  }
}

Component.prototype.isReactComponent = {}

export default Component
