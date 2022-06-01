const fs = require('fs');

const after = (times, fn) => {
    let renderObj = {};
    return (key, value) => {
        renderObj[key] = value;
        --times === 0 && fn(renderObj);
    }
}

let out = after(2, (info) => {
    console.log(info);
})

fs.readFile('./a.text', 'utf8', function (err, data) {
    out("name", data);
})

fs.readFile('./b.json', 'utf8', function (err, data) {
    out("age", JSON.parse(data));
})