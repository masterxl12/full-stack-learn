let Px2vw = require('./px2vw');

function loader(source) {
    // console.log(source, "****", this.query);
    let pr2rem = new Px2vw(this.query)
    console.log(this.resource, "*****");
    // this.resource 当前正在装换模块的绝对路径
    if (this.query.exclude && this.query.exclude.test(this.resource)) {
        return source
    }
    let targetSource = pr2rem.generateRem(source)
    // console.log(targetSource);
    return targetSource
}

module.exports = loader