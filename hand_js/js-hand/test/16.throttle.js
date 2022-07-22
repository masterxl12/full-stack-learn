
export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer)
        let context = this;
        let args = [...arguments]
        timer = setTimeout(() => {
            fn.apply(context, args)
        }, delay)
    }
}

export const throttle = (fn, delay) => {
    let flag = true;
    return function () {
        let context = this;
        let args = [...arguments]
        if (!flag) return
        flag = false
        setTimeout(() => {
            flag = true;
            console.log(fn);
            fn.apply(context, args)
        }, delay)
    }
}