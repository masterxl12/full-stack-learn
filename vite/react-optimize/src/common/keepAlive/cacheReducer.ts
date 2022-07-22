import React from 'react';
import { StatusEnum as cacheTypes, StatusType } from './typings';

interface ICacheShape {
    cacheId: string | number // 缓存的ID
    reactElement: React.ReactNode // 要渲染的虚拟DOM
    doms?: any // 此虚拟DOM对应的真实DOM
    status: StatusType // 缓存的状态是创建、已创建还是激活 
    scrolls?: any // 滚动信息保存对象，默认为是key滚动的dom 值是滚动的位置
}

interface ICacheProps {
    [key: string]: ICacheShape
}

// 页面切换 缓存页面的转态
const cacheReducer = (cacheStates: ICacheProps = {} as any, { type, payload }): ICacheProps => {
    let { cacheId } = payload
    switch (type) {
        case cacheTypes.CREATE:
            return {
                ...cacheStates,
                [cacheId]: {
                    cacheId,
                    reactElement: payload.reactElement,
                    status: cacheTypes.CREATE,
                    scrolls: {}
                }
            };
        case cacheTypes.CREATED:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    doms: payload.doms,
                    status: cacheTypes.CREATED
                }
            };
        case cacheTypes.ACTIVE:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    status: cacheTypes.ACTIVE
                }
            };
        case cacheTypes.DESTROY:
            return {
                ...cacheStates,
                [cacheId]: {
                    ...cacheStates[cacheId],
                    status: cacheTypes.DESTROY
                }
            };
        default:
            return cacheStates
    }
}

export default cacheReducer;