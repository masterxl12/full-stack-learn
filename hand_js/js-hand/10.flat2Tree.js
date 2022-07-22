// 扁平数据结构转tree  链接：https://juejin.cn/post/6983904373508145189
const arrayToTree = (arr) => {
    let result = {}
    const map = {}
    for (let item of arr) {
        map[item.id] = { ...item, children: [] }
    }

    for (let item of arr) {
        let { id, pid } = item;
        let itemTree = map[id]
        if (pid === 0) {
            result = map[id]
        } else {
            if (!map[pid]) {
                map[pid] = {
                    children: []
                }
            }
            map[pid].children.push(itemTree)
        }
    }

    return result
}

// test case
let arr = [
    { id: 1, name: '部门1', pid: 0 },
    { id: 2, name: '部门2', pid: 1 },
    { id: 3, name: '部门3', pid: 1 },
    { id: 4, name: '部门4', pid: 3 },
    { id: 5, name: '部门5', pid: 4 },
]

console.log(JSON.stringify(arrayToTree(arr)));
/**
 [outPut] -> 
 [
    {
        "id": 1,
        "name": "部门1",
        "pid": 0,
        "children": [
            {
                "id": 2,
                "name": "部门2",
                "pid": 1,
                "children": []
            },
            {
                "id": 3,
                "name": "部门3",
                "pid": 1,
                "children": [
                    // 结果 ,,,
                ]
            }
        ]
    }
]
 */

