const Promise = require('./index')

console.log('----------my-promise-------');
// @ts-ignore
let promise = new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve(1)
    }, 1000)
})

let promise2 = promise.then(res => {
    return new Promise((resolve, reject) => {
        // resolve(res + 1000)
        resolve(new Promise((resolve, reject) => {
            setTimeout(() => {
                resolve(res + 100)
            }, 0)
        }))
    })
})

promise2.then(data => {
    console.log(data, "data");
})

Promise.resolve("hello world").then(res => {
    console.log(res, "res");
})

let promiseList = ["1", Promise.resolve(3), () => setTimeout(() => "setTimeout-1000", 1000)]

Promise.race(promiseList).then(res => {
    console.log(res, 'res-resolve');
})

Promise.all(promiseList).then(res => {
    console.log(res, 'res-all');
})
