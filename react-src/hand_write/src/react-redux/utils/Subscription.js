class Subscription {
    constructor(store) {
        this.listeners = [];
        store.subscribe(() => this.notify())
    }

    subscribe(listener) {
        this.listeners.push(listener)
    }

    notify() {
        this.listeners.forEach(l => l())
    }
}

export default Subscription;