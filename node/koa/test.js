const app = {
    middleWares: []
}

app.use = function (fn) {
    app.middleWares.push(fn)
}

app.compose = function () {
    const dispatch = (i) => {
        if (i === app.middleWares.length) return Promise.resolve();

        let currentMiddle = app.middleWares[i]
        return Promise.resolve(currentMiddle(() => dispatch(i + 1)))
    }
    dispatch(0)
}

// 睡眠函数
const sleep = () => {
    return new Promise((resolve) => {
        setTimeout(() => {
            console.log(3000);
            resolve()
        }, 3000);
    })
}

app.use(async (next) => {
    console.log(1);
    await next();
    console.log(2);
});

app.use(async (next) => {
    console.log(3);
    await sleep()
    await next();
    console.log(4);
});

app.use(async (next) => {
    console.log(5);
    await next();
    console.log(6);
});

app.compose();