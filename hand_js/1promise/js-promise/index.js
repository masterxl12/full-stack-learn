// 手写Promise系列
const PENDING = 'pending'
const RESOLVED = "resolved"
const REJECTED = 'rejected'

function resolvePromise(promiseInstance, x, resolve, reject) {
    // promise相互引用问题
    if (promiseInstance === x) {
        throw new TypeError('循环引用')
    }
    // 判断x的状态 判断x 是不是promise
    if ((typeof x === 'object' && x !== null) || typeof x === 'function') {
        // x 需要是一个promise对象 或者函数
        try {
            let then = x.then;
            if (typeof then === 'function') { // 如果x是一个promise对象
                then.call(x, y => resolvePromise(promiseInstance, y, resolve, reject), reject);
            } else {
                resolve(x);
            }
        } catch (e) {
            // x :{then:'123'}
            reject(e)
        }
    } else {
        // 肯定不是promise 就是一个值
        resolve(x)
    }
}

class Promise {
    constructor(executor) {
        this.status = PENDING
        this.value = undefined
        this.reason = undefined
        this.onResolvedCallbacks = []; // 存放成功回调函数
        this.onRejectedCallbacks = []; // 存放失败回调函数

        let resolve = (value) => { // 成功发布函数
            if (value instanceof Promise) {
                return value.then(resolve, reject)
            }
            if (this.status === PENDING) {
                this.status = RESOLVED
                this.value = value
                this.onResolvedCallbacks.forEach(fn => fn())
            }
        }

        let reject = (reason) => { // 失败发布函数
            if (this.status === PENDING) {
                this.status = REJECTED
                this.reason = reason
                this.onRejectedCallbacks.forEach(fn => fn())
            }
        }

        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        };
        this.reject = undefined;
    }

    // 同一个promise实例 可以then多次 -> then方法可以理解为订阅
    // 1. 调用then的时候没有成功也没有失败 可以先保存成功和失败的回调函数
    /**
       2. 链式调用问题 -> 成功和失败的回调都可以返回一个结果
       2.1 如果返回的是一个promise 那么这个promise执行，并使用它的状态，将成功或者失败的结果传递给外层的下一个then中
       2.2 如果返回的是普通值 会把这个值作为外层下一次then的成功回调
       2.2 抛出一个异常
     */
    // 3. 判断onFullFilled和onRejected是否是函数
    then(onFullFilled, onRejected) {
        onFullFilled = typeof onFullFilled === 'function' ? onFullFilled : value => value;
        onRejected = typeof onRejected === 'function' ? onRejected : reason => { throw reason };

        let promise2 = new Promise((resolve, reject) => {
            let onResolvedHandler = () => setTimeout(() => {
                try {
                    let x = onFullFilled(this.value)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0);

            let onRejectedHandler = () => setTimeout(() => {
                try {
                    let x = onRejected(this.reason)
                    resolvePromise(promise2, x, resolve, reject)
                } catch (e) {
                    reject(e)
                }
            }, 0);

            if (this.status === RESOLVED) {
                onResolvedHandler()
            } else if (this.status === REJECTED) {
                onRejectedHandler()
            } else if (this.status === PENDING) {
                this.onResolvedCallbacks.push(onResolvedHandler)
                this.onRejectedCallbacks.push(onRejectedHandler)
            }
        })
        return promise2
    }

    // then没有成功回调的别名
    catch(errorCallback) {
        this.then(null, errorCallback)
    }

    finally(callback) {
        return this.then(
            value => Promise.resolve(callback()).then(() => value),
            reason => Promise.resolve(callback()).then(() => { throw reason })
        )
    }
}

// 静态方法
Promise.resolve = value => {
    return new Promise((resolve, reject) => {
        // if (value instanceof Promise) {
        //     value.then(resolve, reject)
        // } else {
        //     resolve(value)
        // }
        // 执行器构造函数中的resolve对promise实例进行过判断
        resolve(value)
    })
}

Promise.reject = reason => {
    return new Promise((resolve, reject) => {
        reject(reason)
    })
}

Promise.all = function (promiseList) {
    let result = [];
    let resolvedCount = 0;

    return new Promise((resolve, reject) => {
        promiseList.forEach((current, index) => {
            (isPromise(current) ? current : Promise.resolve(current)).then(value => {
                result[index] = value;
                resolvedCount++;
                if (resolvedCount === promiseList.length) {
                    resolve(result)
                }
            }, reject)
        })
    })
}

Promise.race = (promiseList) => {
    return new Promise((resolve, reject) => {
        promiseList.forEach(current => {
            isPromise(current) ? current.then(resolve, reject) : resolve(current)
        });
    })
}

// 检验Promise 是否符合PromiseA+规范
Promise.deferred = () => {
    let dfd = {};
    dfd.promise = new Promise((resolve, reject) => {
        dfd.resolve = resolve;
        dfd.reject = reject;
    })
    return dfd
}

function isPromise(obj) {
    return obj instanceof Promise
}

module.exports = Promise

