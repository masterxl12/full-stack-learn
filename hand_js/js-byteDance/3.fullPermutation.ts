// @ts-nocheck

/**
 * 给定一个字符串abc 实现全排列
 * @param str 
 * @returns 
 */
const fullPer = (str: string): string[] => {
    if (str.length <= 1) {
        return [str]
    }

    let result = [];
    for (let i = 0; i <= str.length - 1; i++) {
        let temp = str[i];
        let last = str.replace(temp, "");

        let middle = fullPer(last).map(item => item + temp);
        result = [...result, ...middle]
    }
    return result
}

const last = fullPer('abcd')
console.log("🚀 ~ file: 3.fullPermutation.ts ~ line 18 ~ res ", last)