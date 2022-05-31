import { updateQueue } from './component'
/**
 * 绑定事件
 * 在react中不是直接绑定的，而是采用一种合成事件的方式处理
 * 使用事件委托
 * @param {*} dom  要绑定的真实dom元素
 * @param {*} eventType 绑定事件的类型
 * @param {*} listener 事件回调函数 handleClick event
 */
export function addEvent(dom, eventType, listener) {
  // ! 1. 在dom元素会保存一个对象
  let store = dom.store = {}
  // button.store.onclick = handleClick
  store[eventType] = listener
  // * document.addEventListener('on',事件处理函数，是否冒泡阶段捕获)
  // ! 事件委托 不管给哪个DOM绑定事件，都会绑定到document上
  document.addEventListener(eventType.slice(2), dispatchEvent, false)
}

/**
 * 1. 为了实现合成事件 
 *  1. 为了性能，快速回收event对象
 *  2. 为了兼容性 屏蔽浏览器差异
 * 2. 为了实现批量更新  
 * @param {*} event
 */
// 合成事件对象
let syntheticEvent = {}

function dispatchEvent(event) {
  // event 是原来的事件对象
  let { target, type } = event // target: button
  let eventType = 'on' + type
  // let store = target // store = button.store -> {onclick: handleClick}
  let listener = target.store && target.store[eventType]  // listener => handleClick
  if (listener) {
    // ! 让合成事件的原生事件指向真实的事件对象
    // listener.call(target, event)
    syntheticEvent.nativeEvent = event
    for (let key in event) {
      syntheticEvent[key] = event[key]
    }
    // 表示进入批量更新模式 不会直接更新
    updateQueue.isBatchingUpdate = true
    listener.call(target, syntheticEvent);
    // 退出批量更新模式，进入直接同步更新模式
    // updateQueue.isBatchingUpdate = false
    // 在事件执行之后进行批量更新
    updateQueue.batchUpdate()
    for (let key in event) {
      syntheticEvent[key] = null
    }
  }
}
