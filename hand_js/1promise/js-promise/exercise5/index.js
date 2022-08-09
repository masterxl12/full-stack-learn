const PENDING = "pending"
const FULFILLED = "fulfilled"
const REJECTED = "rejected"

const resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError("circled revoked..."))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then
            if (typeof then === 'function') {
                then.call(x,
                    y => {
                        if (called) return
                        called = true
                        resolvePromise(y, promise2, resolve, reject)
                    },
                    r => {
                        if (called) return
                        called = true
                        reject(r)
                    }
                )
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
                this.resolvedCallbacks.forEach(fn => fn())
            }
        }
        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.rejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }

    then(onFulfilled, onRejected) {
        onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : r => { throw r }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulfilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);

            }
            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                }, 0);
            }
            if (this.status === PENDING) {
                this.resolvedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulfilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0)
                })
                this.rejectedCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
                })
            }
        })

        return promise2
    }

    catch(errorCallback) {
        this.then(null, errorCallback)
    }

    finally(callback) {
        this.then(
            (value) => Promise.resolve(callback).then(() => value),
            (reason) => Promise.reject(callback).then(() => reason),
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
            values.forEach((value) => {
                Promise.resolve(value).then(resolve, reject)
            })
        })
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            const result = []
            let idx = 0;
            const handlerFn = (index, data) => {
                result[index] = data
                if (++idx === values.length) {
                    resolve(result)
                }
            }
            values.forEach((value, index) => {
                try {
                    if (value && value.then) {
                        value.then(d => handlerFn(index, d), reject)
                    } else {
                        handlerFn(index, value)
                    }
                } catch (e) {
                    reject(e)
                }
            });
        })
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