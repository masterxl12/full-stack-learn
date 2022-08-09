
export const throttle = (fn, delay) => {
    let flag = false
    return (...args) => {
        if (flag) return
        flag = true
        let context = args?.shift()
        setTimeout(() => {
            flag = false
            fn(context, ...args)
        }, delay);
    }
}

export const debounce = (fn, delay) => {
    let timer;
    return (...args) => {
        if (timer) clearTimeout(timer)
        let context = args?.shift()
        timer = setTimeout(() => {
            fn(context, ...args)
        }, delay);
    }
}