let proxy = function (target, data, key) { // vm._data.key
    Object.defineProperty(target, key, { // vm.key
        get() {
            return target[data][key]
        },
        set(newValue) {
            target[data][key] = newValue;
        }
    })
};

let defineProperty = function (target, key, value) {
    Object.defineProperty(target, key, {
        enumerable: false, // 不能被枚举
        configurable: false,
        value: value
    });
};

/*------------------------生命周期合并-------------------------------------*/
const LIFE_CYCLE = [
    'beforeCreate',
    'created',
    'beforeMount',
    'mounted',
    'beforeUpdate',
    'updated',
    'beforeDestroy',
    'destroyed',
];

let strategy = {};
//  组件合并策略
strategy.components = function (parentVal, childVal) {
    const res = Object.create(parentVal);
    if (childVal) {
        for (let key in childVal) {
            res[key] = childVal[key];// 先找自己 在沿着链向上找
        }
    }
    return res;
};
strategy.data = function (parentVal, childVal) {
    return childVal;
};
// strategy.computed = function () {
// };
// strategy.watch = function () {
// };
strategy.methods = function () {
};

function mergeHook(parentVal, childVal) { // 生命周期的合并
    if (childVal) {
        if (parentVal) {
            return parentVal.concat(childVal);
        } else {
            return [childVal]
        }
    } else {
        return parentVal;
    }
}

// 遍历钩子函数 添加合并方法
LIFE_CYCLE.forEach(hook => {
    strategy[hook] = mergeHook;
});

let mergeOptions = function (parent, child) {
    // 遍历父亲  可能父亲有  儿子没有
    const options = {};
    for (let key in parent) { // 父亲和儿子都有
        // console.log('1');
        mergeField(key)
    }

    // 父亲没有 儿子有
    for (let key in child) {// 将儿子多的赋予到父亲上
        if (!parent.hasOwnProperty(key)) {
            // console.log(2);
            mergeField(key)
        }
    }

    // 合并字段  根据key 不同的策略进行合并
    function mergeField(key) {
        if (strategy[key]) {
            options[key] = strategy[key](parent[key], child[key])
        } else {
            // 默认合并
            if (child[key]) {
                options[key] = child[key];
            } else {
                options[key] = parent[key];
            }
        }
    }

    return options;
};

/*------------------------生命周期合并-------------------------------------*/

/*------------------------nextTick实现原理-------------------------------------*/
let callbacks = []; // 用来存储所有需要执行的回调函数
let pending = false; // 用来标志是否正在执行回调函数
let timerFunc; // 用来触发执行回调函数

function flushCallbacks() {
    while (callbacks.length) {
        let cb = callbacks.pop();
        cb();
    }
    pending = false;
}
// 模拟异步 先判断是否支持 promise -> MutationObserve -> setImmediate -> setTimeout
if (Promise) {
    timerFunc = () => {
        Promise.resolve().then(flushCallbacks); // 异步更新处理
    }
} else if (MutationObserver) { // 可以监控dom变化 监控完毕活也是异步更新
    let observe = new MutationObserver(flushCallbacks);
    let textNode = document.createTextNode(1);
    observe.observe(textNode, { characterData: true });
    timerFunc = () => {
        textNode.textContent = 2;
    }
} else if (setImmediate) {
    timerFunc = () => {
        setImmediate(flushCallbacks);
    }
} else {
    timerFunc = () => {
        setTimeout(flushCallbacks)
    }
}
let nextTick = function (cb) {
    // 因为内部会调用nextTick  用户也会调用 但是异步只需要一次
    callbacks.push(cb);
    if (!pending) {
        timerFunc(); // 这个方法时异步方法  已经做过兼容处理
        pending = true;
    }
    // console.log(cb);
};
/*------------------------nextTick实现原理-------------------------------------*/


/*------------------------是否是原生标签-------------------------------------*/
function makeMap(str) {
    const list = str.split(",");
    const mapping = {};
    for (let i = 0; i < list.length; i++) {
        mapping[list[i]] = true;
    }
    return (key) => { //    判断这个标签名是否是原生标签
        return mapping[key];
    }
}

const isReservedTag = makeMap('a,div,img,p,li,ul,ol,span,input,textarea,button,form');

export {
    proxy,
    defineProperty,
    mergeOptions,
    nextTick,
    isReservedTag
}