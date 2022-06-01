const { pathToRegexp } = require('path-to-regexp');

let params = []
// @ts-ignore
let regexp = pathToRegexp('/user/:id/:name', params, { end: false });
let result = '/user/123/abc'.match(regexp);

console.log(result);
console.log(params);

let paramValue = params.reduce((prev, current, index) => {
    prev[current.name] = result[index + 1];
    return prev;
}, {});

console.log("🚀 ~ file: pathToRegExp.js ~ line 15 ~ paramValue ~ paramValue", paramValue)
