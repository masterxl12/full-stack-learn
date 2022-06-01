// 手写Promise系列
export function FakePromise(executor) {}

// 静态方法
FakePromise.resolve = function () {};
FakePromise.reject = function () {};
FakePromise.race = function () {};
FakePromise.all = function () {};

// 实例方法
FakePromise.prototype.then = function () {};
