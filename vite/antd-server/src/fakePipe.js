let fs = require("fs")
let path = require("path")

function fakePipe(readPath, writePath, rMarkHigh, wMarkHigh) {

    let rs = fs.createReadStream(readPath, {
        highWaterMark: rMarkHigh
    })

    let ws = fs.createWriteStream(writePath, {
        highWaterMark: wMarkHigh
    })

    rs.on("data", (chunk) => {
        if (!ws.write(chunk)) {
            rs.pause()
        }
    })

    ws.on("drain", () => {
        rs.resume()
    })

    rs.on('end', () => {
        ws.end()
    })
}

// fakePipe(path.resolve(__dirname, '../', 'package.json'), path.resolve(__dirname, 'temp', 'b.json'), 5, 3)
// console.log(path.resolve(__dirname, '../', 'package.json'), "****", path.resolve(__dirname, 'temp', 'b.json'));

// module.exports = fakePipe