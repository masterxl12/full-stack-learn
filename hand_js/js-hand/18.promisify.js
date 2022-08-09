// node中的工具库函数
const promisify = (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            fn(...args, (err, data) => {
                if (err) return reject(err)
                resolve(data)
            })
        })
    }
}