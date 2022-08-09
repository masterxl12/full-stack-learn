const PENDING = 'pending'
const FULFILLED = 'fulfilled'
const REJECTED = 'rejected'

const resolvePromise = (x, promise2, resolve, reject) => {
    if (x === promise2) {
        return reject(new TypeError("circled revoked..."))
    }

    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        let called;
        try {
            let then = x.then;
            if (typeof then === 'function') {
                then.call(x, (d) => {
                    if (called) return
                    called = true
                    resolvePromise(d, promise2, resolve, reject)
                }, r => {
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
        this.resolveCallbacks = []
        this.rejectCallbacks = []

        const resolve = (value) => {
            if (this.status === PENDING) {
                this.status = FULFILLED
                this.value = value
                this.resolveCallbacks.forEach(fn => fn())
            }
        }

        const reject = (reason) => {
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.rejectCallbacks.forEach(fn => fn())
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
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason }

        let promise2 = new Promise((resolve, reject) => {
            if (this.status === FULFILLED) {
                setTimeout(() => {
                    try {
                        let x = onFulFilled(this.value)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            }

            if (this.status === REJECTED) {
                setTimeout(() => {
                    try {
                        let x = onRejected(this.reason)
                        resolvePromise(x, promise2, resolve, reject)
                    } catch (e) {
                        reject(e)
                    }
                });
            }
            if (this.status === PENDING) {
                this.resolveCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onFulFilled(this.value)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })

                this.rejectCallbacks.push(() => {
                    setTimeout(() => {
                        try {
                            let x = onRejected(this.reason)
                            resolvePromise(x, promise2, resolve, reject)
                        } catch (e) {
                            reject(e)
                        }
                    });
                })
            }
        })

        return promise2
    }

    catch(errCallback) {
        return this.then(null, errCallback)
    }

    finally(callback) {
        return this.then(
            value => Promise.resolve(callback).then(() => value),
            reason => Promise.reject(callback).then(() => reason)
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
            try {
                values.forEach(value => Promise.resolve(value).then(resolve, reject))
            } catch (e) {
                reject(e)
            }
        })
    }

    static all(values) {
        return new Promise((resolve, reject) => {
            let result = [];
            let idx = 0;
            const dataProcess = (index, data) => {
                result[index] = data
                if (++idx === values.length) {
                    return resolve(result)
                }
            }
            try {
                values.forEach((value, index) => {
                    if (value && typeof value.then === 'function') {
                        value.then(d => dataProcess(index, d), reject)
                    } else {
                        dataProcess(index, value)
                    }
                })
            } catch (e) {
                reject(e)
            }
        })
    }
}

Promise.deferred = function () {
    let dfd = {}
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}

module.exports = Promise