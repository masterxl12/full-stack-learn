import {parseHTML} from "./parse";
import {generate} from "./generate";

export function compileToFunctions(template) {
    // html 模板 -> render 函数
    // ast语法树
    // 1. 需要将html代码转化成"ast"语法树 可以用ast语法树来描述语言本身
    let ast = parseHTML(template);
    // console.log("ast: ",ast);
    // 2. 优化静态节点

    // 3. 通过这棵树 重新的生成代码
    let code = generate(ast);
    // console.log(code);

    // 4. 将字符串转变为函数  限制取值范围  通过with来进行取值 稍后调用render函数就可以通过来改变this
    //    让这个函数内部取到结果

    let render = new Function(`with(this){return ${code}}`);
    return render;
}

