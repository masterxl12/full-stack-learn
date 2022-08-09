// test start...   执行testSomething  promise start..  test end...   promise  testSomething 执行testAsync hello async
async function testSomething() {
    console.log("执行testSomething");
    return Promise.resolve("testSomething") // 6
    // return "testSomething";
}

async function testAsync() {
    console.log("执行testAsync"); // 7
    return Promise.resolve("hello async");
}

async function test() {
    console.log("test start...");
    const v1 = await testSomething();
    console.log(v1);
    const v2 = await testAsync(); // 8
    console.log(v2);
    // console.log(v1, v2);
}

test();

let promise = new Promise((resolve) => { console.log("promise start.."); resolve("promise"); })
promise.then((val) => console.log(val)) // 5

console.log("test end...")