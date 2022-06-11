
class AssetPlugin {
    constructor(options) {
        this.options = options
    }

    apply(complier) {
        complier.hooks.compilation.tap("AssetPlugin", (compilation) => {
            compilation.hooks.chunkAsset.tap("AssetPlugin", (chunk, filename) => {
                console.log(chunk, filename);
            })
        })
    }
}

module.exports = AssetPlugin