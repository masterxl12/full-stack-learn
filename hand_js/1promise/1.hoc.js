const say = (...args) => {
    console.log(args, "say");
};

// @ts-ignore
// 对函数进行包装 面向切片编程(将核心抽离) 包装自己的内容
Function.prototype.before = function (cb) {
    return (...args) => {
        cb();
        this(...args);
    };
};

// @ts-ignore
let newSay = say.before(() => {
    console.log("before say");
});

newSay('a','b','c')