// @ts-nocheck
var __spreadArrays = (this && this.__spreadArrays) || function () {
    for (var s = 0, i = 0, il = arguments.length; i < il; i++) s += arguments[i].length;
    for (var r = Array(s), k = 0, i = 0; i < il; i++)
        for (var a = arguments[i], j = 0, jl = a.length; j < jl; j++, k++)
            r[k] = a[j];
    return r;
};

/**
 * 给定一个字符串 实现全排列
 * @param str
 * @returns
 */
var fullPer = function (str) {
    if (str.length <= 1) {
        return [str];
    }
    var result = [];
    var _loop_1 = function (i) {
        var temp = str[i];
        var last_1 = str.replace(temp, "");
        var middle = fullPer(last_1).map(function (item) { return item + temp; });
        result = __spreadArrays(result, middle);
    };
    for (var i = 0; i <= str.length - 1; i++) {
        _loop_1(i);
    }
    return result;
};
var last = fullPer('abcd');
console.log("🚀 ~ file: 3.fullPermutation.ts ~ line 18 ~ res ", last);
