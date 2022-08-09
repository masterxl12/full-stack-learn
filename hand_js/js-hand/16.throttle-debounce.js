
export const debounce = (fn, delay) => {
    let timer = null;
    return function () {
        if (timer) clearTimeout(timer)
        let args = [...arguments]
        console.log(args?.[0], "******", args?.slice(1));
        timer = setTimeout(() => {
            fn.apply(args?.[0], ...args?.slice(1))
        }, delay)
    }
}

export const throttle = (fn, delay) => {
    let flag = true;
    return function () {
        let context = this;
        console.log(context, "******");
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