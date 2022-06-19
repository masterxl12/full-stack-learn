// 击鼓传花题 -> 使用队列
const lastExistNum = (num, n) => {
    let numList = new Array(num).fill().map((_, i) => i + 1);

    while (numList.length > 1) {
        for (let i = 0; i < n - 1; i++) {
            numList.push(numList.shift())
        }
        let eliminated = numList.shift()
        console.log("淘汰人员编号是:" + eliminated);
    }
    return numList[0]
}

console.log("胜出者：" + lastExistNum(7, 3));