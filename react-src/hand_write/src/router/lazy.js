import React from 'react';

/**
 * 动态路由可以让我们实现按需加载组件，从而应用可以在不需要的时候加载更多的组件。
 * React.lazy 接收一个函数 这个函数内部使用import动态加载组件，返回一个promise
 * Promise会resolve一个默认导出的React组件
 * @param {*} load 
 * @returns 
 */
export default function lazy(load) {
    return class extends React.Component {
        state = { Component: null }

        componentDidMount() {
            load.then(result => {
                this.setState({ Component: result.default || result })
            })
        }

        render() {
            const { Component } = this.state
            return Component ? <Component {...this.props} /> : null
        }
    }
}

// 使用 const LazyHome = lazy(() => import('../components/Home'))