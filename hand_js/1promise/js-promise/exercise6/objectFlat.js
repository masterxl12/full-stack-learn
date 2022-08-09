// @ts-ignore
const objectFlat = (obj) => {
    let result = {}
    const flatItem = (data, preKey = '') => {
        Object.entries(data).map(([key, value]) => {
            let newKey = preKey ? `${preKey}.${key}` : key
            if (isPlainObj(value)) {
                flatItem(value, newKey)
            } else {
                result[newKey] = value
            }
        })

    }
    flatItem(obj)
    return result
}

const isPlainObj = (value) => Object.prototype.toString.call(value) === '[object Object]'

// @ts-ignore
const source = { m: { p: 'q' }, a: { b: { c: 1, d: 2 }, e: 3 }, f: { g: 2 } };
console.log(objectFlat(source));