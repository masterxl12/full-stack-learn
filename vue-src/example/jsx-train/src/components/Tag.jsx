export const HTag = {
    name: "h-tag",
    props: {
        tagType: Number,
    },
    render() {
        const Tag = `h${this.tagType}`
        // return h("h" + this.type, {}, this.$slots.default);
        // @ts-ignore
        return <Tag>{this.$slots.default}</Tag>
    },
};
