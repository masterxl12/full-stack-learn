module.exports.test = "B"

let modA = require("./a")

console.log("modB:", modA.test);

module.exports.test = "BB"
