function a(inputStr) {
    let idx = 0
    let arr = inputStr.split('');
    let len = arr.length;
    let isInteger = len % 8;
    let _arr = isInteger ? arr.concat(new Array(8 - len % 8).fill(0)) : arr
    while (idx !== _arr.length) {
        let result = _arr.slice(idx, idx + 8)
        console.log(result.join(''))
        idx += 8;
    }
}

console.log(a("abcdefghi"));