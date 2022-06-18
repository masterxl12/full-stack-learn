// @ts-nocheck
var bigNumAdd = function (a, b) {
    var maxLen = Math.max(a.length, b.length);
    a = a.padStart(maxLen, 0);
    b = b.padStart(maxLen, 0);
    var forward = 0;
    var temp = 0;
    var sum = "";
    for (var i = maxLen - 1; i >= 0; i--) {
        temp = parseInt(a[i]) + parseInt(b[i]) + forward;
        forward = Math.floor(forward / 10);
        sum = (temp % 10) + sum;
    }
    if (forward === 1) {
        sum = 1 + sum;
    }
    return sum;
};
// test demo
var res = bigNumAdd("9007199254740993", "99");
console.log(res);
