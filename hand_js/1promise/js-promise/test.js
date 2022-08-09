// const Promise = require('./myPromise')
// const Promise = require('./exercise/git')
const Promise = require('./exercise/promiseFul2')

let list = [new Promise((resolve) => { resolve(100) }), Promise.resolve(11), 22, Promise.resolve(1),
new Promise((resolve) => { setTimeout(() => { resolve(333) }, 1000) })]
Promise.race(list).then(res => console.log(res), (err) => console.log(err))

let promiseAll = Promise.all(list)

promiseAll.then(data => {
    console.log(data);
}).catch(e => {
    console.log(e);
})

Promise.resolve(33).then(res => {
    console.log(res);
})