const execa = require('execa')

// 并行打包所有文件夹
async function build(target) {
    await execa("rollup", ["-cw", "--environment", `TARGET:${target}`], {
        stdio: "inherit",
    });
}

build("reactivity")

