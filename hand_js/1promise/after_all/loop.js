
async function async1() {
    console.log('async1 start');
    await async2();
};

async function async2() {
    console.log('async2');
}

console.log('script start');

setTimeout(function () {
    console.log('setTimeout');
}, 0);

async1();

new Promise(function (resolve) {
    console.log('promise1');
    resolve();
}).then(function () {
    console.log('promise2');
});

console.log('script end2');

// script start，async1 start，async2， promise1，script end2，promise2， setTimeout
