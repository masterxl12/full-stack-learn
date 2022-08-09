

// const readline = require('readline');

// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });

// rl.on('line', function (line) {
//     console.log(hex2int(line))
// });

const transObj = {
    'a': 10,
    'b': 11,
    'c': 12,
    'd': 13,
    'e': 14,
    'f': 15
}

const hex2int = (input) => {
    const str = input.substr(2).toLowerCase();
    let res = 0, k = 1;
    for (let i = str.length - 1; i >= 0; i--) {
        let current = str[i]
        if (Number(current) >= 0) {
            res += Number(current) * k
        } else {
            res += transObj[current] * k
        }
        k *= 16
    }
    return res
}