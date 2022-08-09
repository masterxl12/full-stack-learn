"use strict";
exports.__esModule = true;
var Singleton = /** @class */ (function () {
    function Singleton() {
    }
    Singleton.getSingleton = function () {
        return Singleton.singleton;
    };
    Singleton.singleton = new Singleton();
    return Singleton;
}());
exports.Singleton = Singleton;
var s1 = Singleton.getSingleton();
var s2 = Singleton.getSingleton();
console.log(s1 === s2);
