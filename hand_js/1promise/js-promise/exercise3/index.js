const PENDING = "pending"
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.resolvedCallbacks = []
        this.rejectedCallbacks = []

        const resolve = (value) => {
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }

            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.resolvedCallbacks.forEach(fn => fn())
            }
        }

        const reject = (reason) => {
            this.status = REJECTED
            this.reason = reason
            this.rejectedCallbacks.forEach(fn => fn())
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulFilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                })
            }

            if (this.status === PENDING) {
                this.resolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulFilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })
                this.rejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    })
                })

            }

        })
        return promise2
    }

    catch(errorCallback) {
        return this.then(null, errorCallback)
    }

    finally(cb) {
        return this.then(
            (value) => Promise.resolve(cb()).then(() => value),
            (reason) => Promise.reject(cb()).then(() => { throw reason }),
        )
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    static race(values) {
        return new Promise((resolve, reject) => {
            values.forEach(value => Promise.resolve(value).then(resolve, reject))
        })
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            const result = [];
            let idx = 0;
            const dataProcess = (index, data) => {
                result[index] = data
                if (++idx === values.length) {
                    resolve(result)
                }
            }

            values.forEach((valueItem, index) => {
                try {
                    if (valueItem && valueItem.then) {
                        valueItem.then(d => dataProcess(index, d), reject)
                    } else {
                        dataProcess(index, valueItem)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

const resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError("circle revoked..."))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x,
                    (y) => {
                        if (called) return
                        called = true
                        resolvePromise(y, promise2, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    })
            } else {
                resolve(x)
            }
        } catch (e) {
            if (called) return
            called = true
            reject(e)
        }
    } else {
        resolve(x)
    }
}

Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise