const fs = require("fs");
const execa = require('execa')

//解析packages目录并过滤非目录问价下的文件
const dirs = fs
    .readdirSync("packages")
    .filter((dir) => fs.statSync(`packages/${dir}`).isDirectory());

// 并行打包所有文件夹
async function build(target) {
    console.log("🚀 ~ file: build.js ~ line 11 ~ build ~ target", target)
    // @ts-ignore
    await execa("rollup", ["-c", "--environment", `TARGET:${target}`], {
        stdio: "inherit",
    });
}

function runParallel(dirs, iterFn) {
    let results = [];
    for (let item of dirs) {
        results.push(iterFn(item));
    }

    return Promise.all(results);
}

runParallel(dirs, build);
