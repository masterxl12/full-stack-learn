/**
 * leetCode20 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s ，判断字符串是否有效。
    有效字符串需满足：
        左括号必须用相同类型的右括号闭合。
        左括号必须以正确的顺序闭合。
 * 
 * @param {*} str 
 * @returns 
 */
const isValid = (str) => {
    const len = str.length;
    if (len === 0) return true
    const dict = {
        "{": "}",
        "[": "]",
        "(": ")"
    }

    const stack = [];
    for (let i = 0; i < len; i++) {
        let curStr = str[i];
        if (dict[curStr]) {
            stack.push(curStr)
        } else {
            if (!stack.length || dict[stack.pop()] !== curStr) return false
        }
    }
    return !stack.length
}

let test1 = isValid("{}[]()")
let test2 = isValid("{[({})]}")
let test3 = isValid("(((())[[{}")
console.log(test1, test2, test3);