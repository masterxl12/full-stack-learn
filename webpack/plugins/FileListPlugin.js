class FileListPlugin {
    constructor({ filename }) {
        this.filename = filename;
    }

    apply(compiler) {
        compiler.hooks.emit.tap('testEmitAndAfterEmit', (compilation) => {
            let assets = compilation.assets;
            let content = `## 文件名      资源大小\r\n`;
            Object.entries(assets).forEach(([filename, Obj]) => {
                content += `- ${filename}      ${Obj.size()}\r\n`;
            })
            assets[this.filename] = {
                source() {
                    return content;
                },
                size() {
                    return content.length;
                }
            }
        })
    }
}

module.exports = FileListPlugin;