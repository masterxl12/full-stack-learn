class EventEmitter {
    constructor() {
        this.events = {}
    }

    on(eventName, callback) {
        if (!this.events) this.events = {}
        this.events[eventName] = this.events[eventName] || []
        this.events[eventName].push(callback)
    }

    emit(eventName, ...args) {
        if (!this.events) this.events = {}
        this.events[eventName].forEach(cb => cb(...args))
    }

    off(eventName, fn) {
        if (!this.events) this.events = {}
        if (this.events[eventName]) {
            this.events[eventName] = this.events[eventName].filter((cb) => cb !== fn && cb.fn !== fn)
        }
    }

    once(eventName, fn) {
        if (!this.events) this.events = {}
        let one = (...args) => {
            fn(...args)
            this.off(eventName, one)
        }
        one.fn = fn
        this.on(eventName, one)
    }
}