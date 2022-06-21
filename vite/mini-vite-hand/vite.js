const Koa = require('koa')
const fs = require('fs')
const path = require('path')

const compilerSFC = require('@vue/compiler-sfc')
const compilerDOM = require('@vue/compiler-dom')

const app = new Koa();

app.use(async ctx => {
    const { url, query } = ctx.request;
    if (url === '/') {
        // 加载index.html
        let content = fs.readFileSync(path.join(__dirname, './index.html'), 'utf8')
        ctx.body = content;
    } else if (url.endsWith('.js')) {
        // js文件的加载处理
        const p = path.join(__dirname, url); // 获取绝对路径
        ctx.type = "application/javascript";
        ctx.body = rewriteImport(fs.readFileSync(p, 'utf8'));
    } else if (url.startsWith("/@modules/")) {
        // 裸模块名称 /@modules/vue -> vue
        const moduleName = url.replace("/@modules/", "");
        // 去node_modules中查找 -> projectDir/node_modules/vue
        const prefix = path.join(__dirname, 'node_modules', moduleName);
        // 从package.json中获取module字段 -> "module": "dist/vue.runtime.esm-bundler.js"
        const module = require(path.join(prefix, 'package.json')).module;
        // 获取模块的绝对路径 -> projectDir/node_modules/vue/dist/vue.runtime.esm-bundler.js
        const vendorPath = path.join(prefix, module);

        // console.log("🚀 ~ file: vite.js ~ line 26 ~ vendorPath", vendorPath)
        const result = fs.readFileSync(vendorPath, 'utf8');

        ctx.type = "application/javascript";
        ctx.body = rewriteImport(result);
    } else if (url.indexOf(".vue") > -1) {
        // const p = path.join(__dirname, url); // 获取绝对路径
        const p = path.join(__dirname, url.split('?')[0])
        const ast = compilerSFC.parse(fs.readFileSync(p, 'utf8'));

        if (!query.type) {
            // SFC请求
            // vue文件 解析为js
            // 获取脚本部分的内容
            const scriptContent = ast.descriptor.script.content;
            console.log(scriptContent, "******((())))");
            // 替换默认导出为一个常量，方便后续修改
            const script = scriptContent.replace(
                'export default',
                'const __script = '
            )
            ctx.type = 'application/javascript'
            ctx.body = `
          ${rewriteImport(script)}
          import {render as __render} from '${url}?type=template'
          __script.render = __render
          export default __script
        `
            // ctx.type = "text/html";
            // ctx.body = fs.readFileSync(p, 'utf8');
        } else if (query.type === 'template') {
            console.log("🚀 ~ file: vite.js ~ line 59 ~ query.type", query.type)
            const tpl = ast.descriptor.template.content
            // 编译为 render 函数
            const render = compilerDOM.compile(tpl, { mode: 'module' }).code
            ctx.type = 'application/javascript'
            ctx.body = rewriteImport(render)
        }
    }
})

// 裸模块地址重写
const rewriteImport = content => {
    const reg = / from ['"](.*)['""]/g;
    return content.replace(reg, (s1, s2) => {
        // console.log(s1, s2);
        // s1 匹配的部分 s2 匹配的分组
        if (s2.startsWith("./") || s2.startsWith("/") || s2.startsWith("../")) {
            // 说明是相对路径（开发者自己定义的模块）
            return s1;
        } else {
            // 说明是裸模块
            return ` from '/@modules/${s2}'`;
        }
    })

}

app.listen(3000, () => {
    console.log("vite is running on port 3000");
})