let oldArrayMethods = Array.prototype;

let arrayMethods = Object.create(oldArrayMethods);

const methods = [
    'push',
    'pop',
    'shift',
    'unshift',
    'reverse',
    'sort',
    'splice'
];

methods.forEach(method => {
    arrayMethods[method] = function (...args) {
        //  当调用数组 劫持后的7个方法 页面应该更新
        //  要知道数组对应哪个dep

        let result = oldArrayMethods[method].apply(this, args);
        let inserted;
        let ob = this.__ob__;
        switch (method) {
            case 'push':
                inserted = args;
                break;
            case 'unshift': // 这两个方法都是追加元素 追加的内容可能是对象  应该再次进行劫持
                inserted = args;
                break;
            case 'splice': // vue.$set 原理
                inserted = args.slice(2);
                break;
            default:
                break;
        }
        if (inserted) ob.observeArray(inserted); // 给数组新增的值也要进行观测
        // 通知数组更新
        ob.dep.notify();
        return result;
    }
});

export {
    arrayMethods
}