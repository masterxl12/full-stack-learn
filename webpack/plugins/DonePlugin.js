
class DonePlugin {
    constructor(options) {
        this.options = options
    }

    apply(complier) {
        complier.hooks.done.tap("AssetPlugin", (stats) => {
            console.log(stats);
        })
    }
}

module.exports = DonePlugin