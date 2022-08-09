function testSomething() {
    console.log("执行testSomething");
    return Promise.resolve("testSomething");
    // return "testSomething";
}

async function testAsync() {
    console.log("执行testAsync");
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");
    const v1 = await testSomething();
    console.log(v1);
    const v2 = await testAsync();
    console.log(v2);
    console.log(v1, v2);
}

test();

let promise = new Promise((resolve) => { console.log("promise start.."); resolve("promise"); });//3
promise.then((val) => console.log(val));

console.log("test end...")