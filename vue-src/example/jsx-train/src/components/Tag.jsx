export const HTag = {
    name: "h-tag",
    props: {
        tagType: Number,
    },
    render() {
        const Tag = `h${this.tagType}`
        // return h("h" + this.type, {}, this.$slots.default);
        /*
            JSX 本质其实是一个函数（createElement)：createElement 有三个参数，
            第一个参数是 type 也就是标签或者组件名、
            第二个参数是 props 是标签属性（例如 id、class、样式或者向子组件传递的数据等）、
            第三个参数是 children 是标签或者组件内的内容
         */
        // @ts-ignore
        return <Tag>{this.$slots.default}</Tag>
    },
};
