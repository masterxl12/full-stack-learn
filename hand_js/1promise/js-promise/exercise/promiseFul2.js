const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"

const resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError("circle revoked..."))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x, (y) => {
                    if (called) return
                    called = true
                    resolvePromise(y, promise2, resolve, reject)
                }, (r) => {
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
                this.resolvedCallbacks.forEach((fn) => fn())
            }
        }

        const reject = (reason) => {
            if (this.status === REJECTED) {
                this.status = REJECTED
                this.reason = reason
                this.rejectedCallbacks.forEach((fn) => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v;
        onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r };

        const handlerFn = (valueOrReason, resolve, reject) => {
            setTimeout(() => {
                try {
                    resolvePromise(valueOrReason, promise2, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0);
        }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                let x = onFulFilled(this.value)
                handlerFn(x, resolve, reject)
            }

            if (this.status === REJECTED) {
                let x = onRejected(this.reason)
                handlerFn(x, resolve, reject)
            }

            if (this.status === PENDING) {
                this.resolvedCallbacks.push(() => {
                    let x = onFulFilled(this.value)
                    handlerFn(x, resolve, reject)
                })
                this.rejectedCallbacks.push(() => {
                    let x = onRejected(this.reason)
                    handlerFn(x, resolve, reject)
                })
            }
        })
        return promise2
    }

    catch(errorCallback) {
        return this.then(null, errorCallback)
    }

    finally(callback) {
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            reason => Promise.reject(callback()).then(() => { throw reason })
        )
    }

    static resolve(value) {
        return new Promise((resolve, reject) => {
            resolve(value)
        })
    }

    static reject(e) {
        return new Promise((resolve, reject) => {
            reject(e)
        })
    }

    static race(values) {
        return new Promise((resolve, reject) => {
            values.forEach((valueItem) => Promise.resolve(valueItem).then(resolve, reject))
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
                        valueItem.then(data => dataProcess(index, data), reject)
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


Promise.defer = Promise.deferred = function () {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd;
}

module.exports = Promise