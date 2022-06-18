
/**
 * 实现请求失败次数不超过三次，有成功就返回
 * @param {*} asyncRequest 
 * @param {*} maxTimes 
 * @param {*} delay 
 * @returns 
 */
const retryRequest = async (asyncRequest, maxTimes, delay) => {
    try {
        return await asyncRequest()
    } catch (error) {
        if (--maxTimes) {
            await sleep(foo, delay)
            return await retryRequest(asyncRequest, maxTimes, sleep)
        } else {
            return Promise.reject(error)
        }
    }
}

// test demo...
let i = 0;
retryRequest(
    () => {
        console.log(++i);
        return Promise.reject('Failed...');
    },
    3,
    1500
).then(res => {
    console.log(res, "res...")
}).catch(err => {
    console.error("err", err)
})

const sleep = (fn, delay) => {
    return new Promise((resolve) => setTimeout(() => {
        fn()
        resolve()
    }, delay))
}

const foo = () => {
    console.log("即将完成...");
}
