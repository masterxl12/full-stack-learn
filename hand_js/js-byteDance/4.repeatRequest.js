
const retry = async (asyncRequest, maxTimes = 3, delay) => {
    try {
        return await asyncRequest()
    } catch (e) {
        if (--maxTimes) {
            await s(() => {
                console.log("request loading...");
            }, delay)
            return await retry(asyncRequest, maxTimes, s)
        } else {
            return Promise.reject(e)
        }
    }
}


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
retry(
    () => {
        console.log(++i);
        // return Promise.reject('Failed...');
        return Promise.resolve('success...');
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

const s = (fn, delay) => {
    return new Promise((resolve, reject) =>
        setTimeout(() => {
            fn()
            resolve()
        }, delay)
    )
}

const foo = () => {
    console.log("即将完成...");
}
