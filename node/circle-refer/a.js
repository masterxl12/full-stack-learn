module.exports.test = "A"

let modB = require("./b")

console.log("modA:", modB.test);

module.exports.test = "AA"
exports.fn = function () {
    console.log(123);
}