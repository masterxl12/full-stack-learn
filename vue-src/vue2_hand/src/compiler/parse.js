//正则表达式量词 *零个或多个 +至少一个 ?零个或者1个
// <div>hello {{name}} <span>world</span></div>
const dynamicArgAttribute = /^\s*((?:v-[\w-]+:|@|:|#)\[[^=]+?\][^\s"'<>\/=]*)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;       // aaa-123aa 匹配标签名
const qnameCapture = `((?:${ncname}\\:)?${ncname})`; // 匹配不捕获 <my :xxx></my>
const startTagOpen = new RegExp(`^<${qnameCapture}`); // 标签开头的正则  捕获的内容是标签名
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`); // 匹配标签结尾的 </div>
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/;
//匹配属性 aaa="b" aaa='b' aaa=b
const startTagClose = /^\s*(\/?)>/;  // 开始闭合标签处理  匹配标签结束的 以空白字符开头 以> 或/> 结尾
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;
const doctype = /^<!DOCTYPE [^>]+>/i;
const comment = /^<!\--/
const conditionalComment = /^<!\[/;

export function parseHTML(html) {
    function createASTElement(tagName, attrs) {
        return {
            tag: tagName, // 标签名
            type: 1,      // 标签类型
            children: [], // 子节点
            attrs,        // 属性
            parent: null  // 父节点
        }
    }

    let root;
    let currentParent;
    let stack = []; // 使用栈来模拟 标签是否符合规则

    //  解析开始标签
    function start(tagName, attrs) {
        let element = createASTElement(tagName, attrs);
        if (!root) { // 如果没有根级元素，则创建
            root = element;
        }
        currentParent = element; // 将当前解析的标签  保存起来
        stack.push(element)   // 将生成的ast 放到栈中
        // console.log(tagName, attrs, '========开始标签======');
    }

    //  解析结束标签
    function end(tagName) {
        // 在结尾标签处 创建父子关系
        let element = stack.pop(); // 取出栈中的最后一个
        let currentParent = stack[stack.length - 1];
        if (currentParent) { // 在闭合时可以知道这个标签的父亲是谁
            element.parent = currentParent;
            currentParent.children.push(element);
        }
        // console.log(tagName, "---------结束标签-----------");
    }

    //  解析标签中的文本内容
    function chars(text) {
        // text = text.replace(/\s/g, '');
        text = text.replace(/(^\s*)|(\s*$)/g, '');
        if (text) {
            currentParent.children.push({
                type: 3,
                text,
                parent: currentParent
            })
        }
        // console.log(text, '---------文本---------');
    }

    // 不断遍历到模板字符串结尾，并使用正则表达式匹配开始标签 文本 结束标签，
    // 同时将匹配到的结果，处理返回一包含标签名、属性、children、parent等属性包装的对象结构
    // 然后使用树形数据结构不断串联起处理后的结果，最后将根级元素返回
    while (html) { // 只要html不为空 字符串就一直解析
        let textEnd = html.indexOf('<');
        if (textEnd === 0) {
            const startTagMatch = parseStartTag(); // 处理开始标签
            if (startTagMatch) {
                start(startTagMatch.tagName, startTagMatch.attrs);
                continue;
            }
            // console.log(html);
            // 有可能是结束标签 </>
            const endTagMatch = html.match(endTag);
            if (endTagMatch) { // 处理结束标签
                // console.log(endTagMatch);
                advance(endTagMatch[0].length);
                end(endTagMatch[1]);
            }
        }
        let text;
        if (textEnd > 0) { // 是文本
            text = html.substring(0, textEnd);
        }
        if (text) { // 处理文本
            // console.log(text);
            advance(text.length);
            // console.log(html);
            chars(text);
        }
        // break;
    }

    function advance(n) { // 将字符串进行截取操作  在更新html内容
        // console.log(html);
        html = html.substring(n);
        // console.log(html);
    }

    function parseStartTag() {
        const start = html.match(startTagOpen);
        if (start) {
            // console.log(start);
            const match = {
                tagName: start[1],
                attrs: []
            };
            advance(start[0].length);// 删除开始标签
            // 如果直接是闭合标签 说明没有属性
            let end;
            let attr;
            while (!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
                // console.log(attr);
                let value = attr[3] || attr[4] || attr[5];
                match.attrs.push({
                    name: attr[1], value
                });
                advance(attr[0].length);// 删除已匹配标签,游标前进
            }
            if (end) { // > 删除匹配到的结束标签
                advance(end[0].length);
                return match;
            }
        }
    };

    return root;
}