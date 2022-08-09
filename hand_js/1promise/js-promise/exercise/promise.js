const PENDING = "PENDING"
const FULFILLED = "FULFILLED"
const REJECTED = "REJECTED"


function resolvePromise(x, promise2, resolve, reject) {
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


class Promise1 {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined

        this.resolvedCallbacks = []
        this.rejectedCallbacks = []

        const resolve = (v) => {
            if (v instanceof Promise1) {
                return v.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = v
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

    then(onFulFilled, onRejected) {
        onFulFilled = typeof onFulFilled === 'function' ? onFulFilled : v => v
        onRejected = typeof onRejected === 'function' ? onRejected : e => { throw e }

        let promise2 = new Promise1((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulFilled(this.value)
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
                            let x = onFulFilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    }, 0);
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
        return this.then(null, errorCallback)
    }

    static resolve(data) {
        return new Promise1((resolve, reject) => {
            resolve(data)
        })
    }

    static reject(reason) {
        return new Promise1((resolve, reject) => {
            reject(reason)
        })
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            const result = []
            let idx = 0;
            const processData = (index, data) => {
                result[index] = data
                if (++idx === values.length) {
                    resolve(result)
                }
            }
            values.forEach((valueItem, index) => {
                try {
                    if (valueItem && valueItem.then) {
                        valueItem.then((data) => processData(index, data), reject)
                    } else {
                        processData(index, valueItem)
                    }
                } catch (e) {
                    reject(e)
                }
            })
        })
    }
}

Promise1.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise1((resolve, reject) => {
        dfd.resolve = resolve
        dfd.reject = reject
    })
    return dfd
}

module.exports = Promise1