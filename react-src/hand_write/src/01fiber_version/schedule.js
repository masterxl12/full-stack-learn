import { setProps } from './utils'
import { ELEMENT_TEXT, TAG_ROOT, PLACEMENT, TAG_HOST, TAG_TEXT, UPDATE, DELETION } from './constants'
/**
 * 从根节点开始渲染和调度 两个阶段
 *
 * diff阶段 对比新旧虚拟DOM，进行增量 更新或者创建，render阶段
 * 这个阶段可能比较花费时间 可以对任务进行拆分 拆分的维度虚拟DOM，此阶段也可暂停
 * render阶段成果是effect list，知道哪些节点更新、删除或者是增加
 * render阶段有两个任务 1. 根据虚拟DOM生成fiber树 2. 收集effectList
 * commit阶段 进行DOM更新创建阶段，此阶段不能暂停，需要一气呵成
 */

let nextUnitOfWork = null // 下一个工作单元
let workInProgressRoot = null //  正在渲染的根Fiber
let currentRoot = null // 渲染成功之后当期根 rootFiber
let deletions = [] // 删除的节点 并不放在effect list中 因此需要单独记录并执行

export function scheduleRoot(rootFiber) {
  // {tag,sateNode,props}
  if (currentRoot && currentRoot.alternate) {
    //第二次之后的更新
    workInProgressRoot = currentRoot.alternate // 第一次渲染出来的那个fiber tree
    workInProgressRoot.props = rootFiber.props // 让它的props更新成新的props
    workInProgressRoot.alternate = currentRoot // 让这个树的替身指向当前的currentRoot
  } else if (currentRoot) {
    // 说明至少已经渲染过一次 第一次更新
    rootFiber.alternate = currentRoot
    workInProgressRoot = rootFiber
  } else {
    // 说明是第一此渲染
    workInProgressRoot = rootFiber
  }
  workInProgressRoot.firstEffect = workInProgressRoot.lastEffect = workInProgressRoot.nextEffect = null
  nextUnitOfWork = workInProgressRoot
}

function performUnitOfWork(currentFiber) {
  beginWork(currentFiber) // 开
  if (currentFiber.child) {
    return currentFiber.child
  }
  while (currentFiber) {
    completeUnitOfWork(currentFiber) // 所有的儿子遍历完成 则自己完成
    if (currentFiber.sibling) {
      // 如果有弟弟 返回弟弟
      return currentFiber.sibling
    }
    currentFiber = currentFiber.return // 找父亲然后让父亲完成
  }
}

// 每个fiber有两个属性 firstEffect指向第一个有副作用的子fiber lastEffect指向最后一个有副作用的子fiber
// 中间用nextEffect做成一个单链表
/**
 * @description 在完成的时候要收集有副作用的fiber，然后组成effect list
 * @param {*} currentFiber
 */
function completeUnitOfWork(currentFiber) {
  console.log('收集副作用：', currentFiber.tag, currentFiber.stateNode)
  let returnFiber = currentFiber.return
  if (returnFiber) {
    // 把自己儿子的effect挂载父亲身上
    if (!returnFiber.firstEffect) {
      returnFiber.firstEffect = currentFiber.firstEffect
    }
    if (currentFiber.lastEffect) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber.firstEffect
      }
      returnFiber.lastEffect = currentFiber.lastEffect
    }
    // ----------------------------------------------------------------
    // 把自己挂到父亲节点上
    const effectTag = currentFiber.effectTag
    if (effectTag) {
      if (returnFiber.lastEffect) {
        returnFiber.lastEffect.nextEffect = currentFiber
      } else {
        returnFiber.firstEffect = currentFiber
      }
      returnFiber.lastEffect = currentFiber
    }
  }
}

//开始执行
/**
 * @description
 * @param {*} currentFiber
 * 1. 创建真实DOM元素
 * 2. 创建子fiber
 */
function beginWork(currentFiber) {
  if (currentFiber.tag === TAG_ROOT) {
    // 根fiber
    updateHostRoot(currentFiber)
  } else if (currentFiber.tag === TAG_TEXT) {
    // 文本fiber
    updateHostText(currentFiber)
  } else if (currentFiber.tag === TAG_HOST) {
    // 原生DOM节点
    updateHost(currentFiber)
  }
}
/**
 * 因为是根Fiber， 所以本身就存在真实DOM元素   #root；
 * 直接开始遍历children，创建子Fiber;
 */
function updateHostRoot(currentFiber) {
  let newChildren = currentFiber.props.children // [element]
  reconcileChildren(currentFiber, newChildren)
}

function updateHostText(currentFiber) {
  // 如果此Fiber没有创建DOM节点，那么就需要创建
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
}
function updateHost(currentFiber) {
  if (!currentFiber.stateNode) {
    currentFiber.stateNode = createDOM(currentFiber)
  }
  let newChildren = currentFiber.props.children // [element]
  reconcileChildren(currentFiber, newChildren)
}

function createDOM(currentFiber) {
  if (currentFiber.tag === TAG_TEXT) {
    return document.createTextNode(currentFiber.props.text)
  } else if (currentFiber.tag === TAG_HOST) {
    let stateNode = document.createElement(currentFiber.type)
    updateDOM(stateNode, {}, currentFiber.props)
    return stateNode
  }
}

function updateDOM(stateNode, oldProps, newProps) {
  if (stateNode.setAttribute) {
    setProps(stateNode, oldProps, newProps)
  }
}

// 调和儿子
// newChildren 是一个虚拟的DOM数组 把虚拟DOM转成Fiber节点
function reconcileChildren(currentFiber, newChildren) {
  let newChildIndex = 0 // 新子节点的索引
  let oldFiber = currentFiber.alternate && currentFiber.alternate.child
  let prevSibling // 上一个新的子fiber
  //   遍历子虚拟DOM元素数组，为每个虚拟DOM元素创建子fiber
  while (newChildIndex < newChildren.length || oldFiber) {
    let newChild = newChildren[newChildIndex] // 取出虚拟DOM节点
    let tag
    let newFiber
    if (newChild && newChild.type === ELEMENT_TEXT) {
      tag = TAG_TEXT // 表示这是文本节点
    } else if (newChild && typeof newChild.type === 'string') {
      tag = TAG_HOST //如果type是字符串 说明是原生DOM节点 div span
    }
    const sameType = oldFiber && newChild && oldFiber.type === newChild.type
    if (sameType) {
      // 说明老fiber和新虚拟DOM类型一致 可以直接复用老的DOM
      newFiber = {
        tag: oldFiber.tag, // TAG_HOST
        type: oldFiber.type, // div
        props: newChild.props, // {id="A1",style={style}}
        stateNode: oldFiber.stateNode, // 还未创建真实DOM元素
        return: currentFiber, // 父fiber returnFiber
        alternate: oldFiber, // 让新的fiber的alternate指向老的fiber节点
        effectTag: UPDATE, // 副作用标识 render过程中需要收集副作用 增加 删除 更新 第一次渲染均为增加
        nextEffect: null, // effect list 是一个单链表
      }
    } else {
      if (newChild) {
        // beginWork 创建fiber 在completeUnitOfWork的时候收集effect
        newFiber = {
          tag, // TAG_HOST
          type: newChild.type, // div
          props: newChild.props, // {id="A1",style={style}}
          stateNode: null, // 还未创建真实DOM元素
          return: currentFiber, // 父fiber returnFiber
          effectTag: PLACEMENT, // 副作用标识 render过程中需要收集副作用 增加 删除 更新 第一次渲染均为增加
          nextEffect: null, // effect list 是一个单链表
          // effect list副作用依赖收集的顺序 和节点完成的顺序是一致的
        }
      }
      if (oldFiber) {
        oldFiber.effectTag = DELETION
        deletions.push(oldFiber)
      }
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling
    }

    if (newFiber) {
      if (newChildIndex === 0) {
        currentFiber.child = newFiber
      } else {
        prevSibling.sibling = newFiber
      }
      prevSibling = newFiber
    }
    newChildIndex++
  }
}

// 循环执行工作 nextUnitOfWork
function workLoop(deadline) {
  let shouldYield = false
  while (nextUnitOfWork && !shouldYield) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork)
    shouldYield = deadline.timeRemaining() < 1 // 没有时间的话就要让出控制权。
  }
  if (!nextUnitOfWork && workInProgressRoot) {
    console.log('render阶段结束')
    console.log('最终形成的Fiber链：', workInProgressRoot)
    commitRoot()
  }
  // 如果时间片到期后还有任务没有完成， 就需要请求浏览器再次调度。
  requestIdleCallback(workLoop, { timeout: 500 })
}

// 提交根节点
function commitRoot() {
  deletions.forEach(commitWork) // 执行effect list之前 把该删除的元素删除
  console.log('commitRoot', workInProgressRoot)
  let currentFiber = workInProgressRoot.firstEffect
  while (currentFiber) {
    commitWork(currentFiber)
    currentFiber = currentFiber.nextEffect
  }
  deletions.length = 0 //提交之后需要清空deletions数组
  currentRoot = workInProgressRoot // 把当前渲染成功的根Fiber 赋给currentRoot;
  workInProgressRoot = null
}

function commitWork(currentFiber) {
  if (!currentFiber) return
  let returnFiber = currentFiber.return
  while (returnFiber.tag !== TAG_HOST && returnFiber.tag !== TAG_ROOT && returnFiber.tag !== TAG_TEXT) {
    returnFiber = returnFiber.return
  }
  let returnDOM = returnFiber.stateNode
  if (currentFiber.effectTag === PLACEMENT) {
    // 新增节点
    // let nextFiber = currentFiber
    // 如果要挂载的节点不是DOM节点，比如说是类组件Fiber，一直找第一个儿子，直到找到一个真实DOM节点为止。
    // while (nextFiber.tag !== TAG_HOST && nextFiber.tag !== TAG_ROOT && nextFiber.tag !== TAG_TEXT) {
    //   nextFiber = nextFiber.child
    // }
    returnDOM.appendChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === DELETION) {
    // 删除节点
    // return commitDeletion(currentFiber, returnDOM)
    returnDOM.removeChild(currentFiber.stateNode)
  } else if (currentFiber.effectTag === UPDATE) {
    if (currentFiber.type === ELEMENT_TEXT) {
      if (currentFiber.alternate.props.text !== currentFiber.props.text) {
        currentFiber.stateNode.textContent = currentFiber.props.text
      } else {
        updateDOM(currentFiber.stateNode, currentFiber.alternate.props, currentFiber.props)
      }
    }
  }
  currentFiber.effectTag = null
}

requestIdleCallback(workLoop, { timeout: 500 })
