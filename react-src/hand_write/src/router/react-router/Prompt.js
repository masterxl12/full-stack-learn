import React from 'react';
import Lifecycle from './LifeCycle';
import RouterContext from './RouterContext';

export default function Prompt({ when = true, message }) {
    return <RouterContext.Consumer>
        {
            contextValue => {
                // 如果when为false，则表示不需要拦截，直接返回null 什么都不做
                if (!when) return null
                // 从history中获取block函数
                const { block } = contextValue.history;
                return <Lifecycle
                    onMount={lifeCycleInstance => lifeCycleInstance.release = block(message)}
                    onUnMount={lifeCycleInstance => lifeCycleInstance.release()}
                />
            }
        }
    </RouterContext.Consumer>
}
