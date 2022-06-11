
const JSZip = require('jszip')
class RawSource {
    constructor(content) {
        this.content = content
    }
    source() {
        return this.content
    }
}


class ZipPlugin {
    constructor({ filename }) {
        this.filename = filename

    }

    apply(compiler) {
        compiler.hooks.emit.tapAsync("ZipPlugin", (compilation, callback) => {
            let zip = new JSZip();
            let assets = compilation.assets;
            for (let filename in assets) {
                const source = assets[filename].source();
                zip.file(filename, source)
            }
            zip.generateAsync({ type: 'nodebuffer' }).then(content => {
                compilation.assets[this.filename] = new RawSource(content)
                callback()
            })
        })
    }
}

module.exports = ZipPlugin