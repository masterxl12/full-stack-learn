
// 寄生组合式继承
const inherit = (subType, superType) => {
    let prototype = Object.create(superType.prototype) // 创建对象
    // prototype.__proto === superType.prototype
    // prototype.constructor === superType.prototype.constructor -> superType
    prototype.constructor = subType // 增强对象
    subType.prototype = prototype // 指定对象
    // subType.prototype.constructor -> subType
}