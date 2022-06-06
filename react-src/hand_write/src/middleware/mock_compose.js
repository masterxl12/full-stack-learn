function compose(...fns) {
    if (fns.length === 0) {
        return arg => arg;
    }

    if (fns.length === 1) {
        return fns[0];
    }

    return fns.reduce((a, b) => (...args) => a(b(...args)));
}
// 第一次 a: promise(next) b:thunk(next) -> (...args) => promise(thunk(...args))
// 第二次 a: (...args) => promise(thunk(...args)) b: logger(next)

let promise = next => action => {
    console.log("promise中间件");
    next(action)
}
let thunk = next => action => {
    console.log("thunk中间件");
    next(action)
}
let logger = next => action => {
    console.log("logger中间件");
    next(action)
}

const dispatch = () => {
    console.log("dispatch中间件");
}

let chain = [promise, thunk, logger];
// let composeFn = (next) => promise(thunk(logger(next)));
let composeFn = compose(...chain);

console.log(composeFn);

let newDispatch = composeFn(dispatch);
newDispatch({ type: 'ADD' })
