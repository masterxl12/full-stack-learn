
const retryRequest = async (asyncRequest: Function, maxTimes) => {
    try {
        return await asyncRequest()
    } catch (error) {
        if (--maxTimes) {
            return retryRequest(asyncRequest, maxTimes)
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
        return Promise.resolve('success...');
    },
    3
).then(res => {
    console.log(res, "res...")
}).catch(err => {
    console.error(err)
})

const sleep = (fn: Function, delay: number): void => {
    setTimeout(fn, delay);
}

const foo = () => { console.log("123...") }

console.log("start...");
sleep(foo, 2000)
console.log("end...");