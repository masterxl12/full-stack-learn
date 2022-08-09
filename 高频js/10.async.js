// script start
// async2 end
// Promise
// script end
// async2 end1
// promise1
// promise2
// async1 end
// setTimeout
console.log('script start')

async function async1() {
    let v = await async2()
    console.log(v);
    console.log('async1 end')
}
async function async2() {
    console.log('async2 end')
    return 'async2 end1'
    // return Promise.resolve().then(() => {
    //     console.log('async2 end1')
    // })
}
async1()

setTimeout(function () {
    console.log('setTimeout')
}, 0)

new Promise(resolve => {
    console.log('Promise')
    resolve()
})
    .then(function () {
        console.log('promise1')
    })
    .then(function () {
        console.log('promise2')
    })

console.log('script end')