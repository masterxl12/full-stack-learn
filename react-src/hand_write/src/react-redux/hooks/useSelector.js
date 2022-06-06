import React, { useLayoutEffect, useReducer, useRef } from 'react';
import useReduxContext from './useReduxContext';

// 默认比较两个对象相等 引用地址
const qualityFn = (a, b) => a === b;

/**
 * useSelector hook作用
 * 1.获得总状态中的一部分状态
 * 2.如果状态发生变更，需要进行刷新组件
 * @param {*} selector 
 * @param {*} equalityFn 
 * @param {*} store 
 * @param {*} subscription 
 * @returns 
 */
function useSelectorWithStore(selector, equalityFn, store, subscription) {
    const [, forceRender] = useReducer(s => s + 1, 0);// 定义强行更新的函数
    const lastSelector = useRef();// 上一个选择器函数
    const lastStoreState = useRef();// 上一个仓库状态
    const lastSelectedState = useRef();// 上一个选中的转态

    const storeState = store.getState();
    let selectedState;
    // 如果选择器变了 或者仓库状态变化了
    if (selector !== lastSelector.current || storeState !== lastStoreState.current) {
        // 重新映射得到新的状态
        selectedState = selector(storeState);
    } else {
        // 总状态没有变化 映射函数也没有变化 直接使用上一个映射出的状态
        selectedState = lastSelectedState.current;
    }

    useLayoutEffect(() => {
        lastSelector.current = selector;
        lastStoreState.current = storeState;
        lastSelectedState.current = selectedState;
    })

    useLayoutEffect(() => {
        function checkForUpdates() {
            // @ts-ignore
            const newSelectedState = lastSelector.current(store.getState())
            if (equalityFn(newSelectedState, lastSelectedState.current)) {
                return
            }
            lastSelectedState.current = newSelectedState
            forceRender()
        }
        checkForUpdates();
        subscription.subscribe(checkForUpdates)
    }, [equalityFn, store, subscription])

    return selectedState;
}

export default function useSelector(selector) {
    const { store, subscription } = useReduxContext();
    const selectedState = useSelectorWithStore(selector, qualityFn, store, subscription);
    return selectedState;
}