/**
 * fiber中 很多地方使用到链表
 */

class Update {
  constructor(payload, nextUpdate) {
    this.payload = payload
    this.nextUpdate = nextUpdate // 指向下一个节点的指针
  }
}

class UpdateQueue {
  constructor() {
    this.baseState = null // 原始状态
    this.firstUpdate = null // 第一个更新
    this.lastUpdate = null // 最后一个更新
  }

  // 链表尾部添加元素
  enqueueUpdate(updateInstance) {
    if (this.firstUpdate == null) {
      this.firstUpdate = this.lastUpdate = updateInstance
    } else {
      this.lastUpdate.nextUpdate = updateInstance
      this.lastUpdate = updateInstance
    }
  }
  // 获取老状态，然后遍历这个链表，进行更新
  forceUpdate() {
    let currentState = this.baseState || {}
    let currentUpdate = this.firstUpdate
    while (currentUpdate) {
      const { payload, nextUpdate } = currentUpdate
      // 判断当前节点添加的是普通对象还是函数
      let nextState = typeof payload === 'function' ? payload(currentState) : payload
      currentState = { ...currentState, ...nextState }
      currentUpdate = nextUpdate
    }
    this.firstUpdate = this.lastUpdate = null
    this.baseState = currentState
    return currentState
  }
}

// 计数器 {number:0} setState({number:1}) setState((state)=>({number:state.number + 1}))})
let queue = new UpdateQueue()
queue.enqueueUpdate(new Update({ name: 'zs' }))
queue.enqueueUpdate(new Update({ number: 0 }))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))
queue.enqueueUpdate(new Update((state) => ({ number: state.number + 1 })))

console.log(queue.forceUpdate())
