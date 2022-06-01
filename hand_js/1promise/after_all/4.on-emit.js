const fs = require('fs');

// 发布订阅模式 -> 两者之间没有任何关系
let events = {
    arr: [],
    on(handler) {
        this.arr.push(handler);
    },
    emit() {
        this.arr.forEach(handler => handler())
    }
}

let renderObj = {};

events.on(() => {
    console.log("reading data...");
})

events.on(() => {
    if (Object.keys(renderObj).length === 2) {
        console.log("render start...");
    }
})

fs.readFile('./a.text', 'utf8', function (err, data) {
    renderObj.name = data;
    events.emit();
})

fs.readFile('./b.json', 'utf8', function (err, data) {
    renderObj.age = JSON.parse(data);
    events.emit()
})