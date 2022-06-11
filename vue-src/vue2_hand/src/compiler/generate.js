// <div id='app' style="color:red">hello {{name}} <span>world</span></div>
/*
将HTML生成render函数
render(){
    return _c('div',{id:'app',style:{color:"red"}},_v('hello' + _s(name)),_c('span',null,_v('world')))
}
*/
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
// const defaultTagRE = /\{\{((?:.|\n)+?)\}\}/g;

// 语法层面转义
function gen(node) {
    if (node.type === 1) {
        return generate(node) // 生成元素节点的字符串
    } else {
        let text = node.text;  // 获取文本
        // console.log(text);
        //  如果是普通文本  不带{{}}
        if (!defaultTagRE.test(text)) {
            return `_v(${JSON.stringify(text)})`;
            // _v('hello {{name}} world {{msg}}') -> _v('hello' + _s(name) + 'world' + _s(msg))
        }
        let tokens = [];// 存放每一段的代码
        let lastIndex = defaultTagRE.lastIndex = 0;// 如果正则是全局模式 需要每次使用前置为0
        let match, index;// 每次匹配到的结果

        while ((match = defaultTagRE.exec(text))) { // 捕获大括号中的内容
            // console.log(match); // ["{{name}}", "name", index: 5, input: "hello{{name}}", groups: undefined]
            index = match.index;
            if (index > lastIndex) {
                tokens.push(JSON.stringify(text.slice(lastIndex, index)))
            }
            tokens.push(`_s(${match[1].trim()})`);
            lastIndex = index + match[0].length;// 下一次开始匹配的索引
        }

        if (lastIndex < text.length) {
            tokens.push(JSON.stringify(text.slice(lastIndex)));
        }
        return `_v(${tokens.join('+')})`;
    }
}

function genProps(attrs) {
    let str = '';
    attrs.forEach(attr => {
        if (attr.name === 'style') { // style="color:red;left:20px"
            let obj = {};
            attr.value.split(';').forEach(item => {
                let [key, value] = item.split(":");
                obj[key] = value
            });
            attr.value = obj; // 输出 style:{color:'red',left:'20px'}
        }
        str += `${attr.name}:${JSON.stringify(attr.value)},`;
    });
    return `{${str.slice(0, -1)}}`;
}

function genChildren(el) {
    const children = el.children;
    if (children) { // 将所有转化后的儿子用逗号拼接起来
        return children.map(child => gen(child)).join(',')
    }
}

export function generate(ast) {
    let children = genChildren(ast);
    let code = `_c('${ast.tag}',${
        ast.attrs.length ? `${genProps(ast.attrs)}` : 'undefined'
    }${
        children ? `,${children}` : ''
    })`;
    // console.log(code);
    return code;
}