// 发布订阅模式 EventEmitter 手写 on emit off once
function EventEmitter() {
    this.events = {}
}

EventEmitter.prototype.on = function (eventName, callback) {
    if (!this.events) this.events = {}
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(callback)
}

EventEmitter.prototype.emit = function (eventName, ...args) {
    if (!this.events) this.events = {}
    if (this.events[eventName]) {
        this.events[eventName].forEach(cb => cb(...args))
    }
}

EventEmitter.prototype.off = function (eventName, fn) {
    if (!this.events) this.events = {}
    if (this.events[eventName]) {
        this.events[eventName] = this.events[eventName].filter(cb => cb !== fn && cb.fn !== fn)
    }
}

EventEmitter.prototype.once = function (eventName, fn) {
    if (!this.events) this.events = {}
    let one = (...args) => {
        fn(...args)
        // 执行完毕后 删除事件
        this.off(eventName, one)
    }
    // 先绑定事件
    one.fn = fn; // 自定义属性 创建关联
    this.on(eventName, one)
}

let emitter = new EventEmitter();

let handler = (e) => {
    console.log(e + "撸串。。。");
}

emitter.on("sleep", (e) => {
    console.log(e + "吃火锅");
})
emitter.on("sleep", handler)

// emitter.once("sleep", handler)
emitter.off("sleep", handler)

emitter.emit("sleep", "zs")
emitter.emit("sleep", "ls")