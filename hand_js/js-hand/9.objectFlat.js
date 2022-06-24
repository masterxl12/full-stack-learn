
const objectFlat = (obj) => {
    let result = {};

    const flatItem = (objItem, preKey = "") => {
        Object.entries(objItem).forEach(([key, value]) => {
            let newKey = preKey ? `${preKey}.${key}` : key
            if (isObject(value)) {
                flatItem(value, newKey)
            } else {
                result[newKey] = value
            }
        })
    }

    flatItem(obj)
    return result
}

const isObject = (obj) => {
    return Object.prototype.toString.call(obj) === '[object Object]'
}

// test case
const source = { m: { p: 'q' }, a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(objectFlat(source));