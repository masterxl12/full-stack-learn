import { useCallback, useReducer } from "react"
import CacheContext from "./CacheContext"
import cacheReducer from "./cacheReducer"
import { StatusEnum } from "./typings"

const KeepAliveProvider = (props) => {
    const [cacheStates, dispatch] = useReducer(cacheReducer, {})
    // cacheStates存放所有的缓存信息 dispatch派发动作方法，可以通过派发动作修改缓存信息
    const mount = useCallback(({ cacheId, reactElement }) => {
        if (cacheStates[cacheId]) {
            let cacheState = cacheStates[cacheId]
            if (cacheState.status === StatusEnum.DESTROY) {
                let doms = cacheState.doms
                doms.forEach(dom => dom.parentNode.removeChild(dom))
                dispatch({ type: StatusEnum.CREATE, payload: { cacheId, reactElement } })
            }
        } else {
            dispatch({ type: StatusEnum.CREATE, payload: { cacheId, reactElement } })
        }
    }, [cacheStates])

    // 保持滚动位置
    const handleScroll = useCallback((cacheId, event) => {
        if (cacheStates[cacheId]) {
            let target = event.target
            let scrolls = cacheStates[cacheId].scrolls;
            scrolls[target] = target.scrollTop;
        }
    }, [cacheStates])

    return (
        <CacheContext.Provider value={{ cacheStates, dispatch, mount, handleScroll }}>
            {props.children}
            {
                Object.values(cacheStates)
                    ?.filter(cacheState => cacheState.status !== StatusEnum.DESTROY)
                    ?.map(({ cacheId, reactElement }) => (
                        <div
                            id={`cache_${cacheId}`}
                            key={cacheId}
                            ref={(divDOM) => {
                                let cacheState = cacheStates[cacheId]
                                if (divDOM && (!cacheState.doms || cacheState.status === StatusEnum.DESTROY)) {
                                    let doms = Array.from(divDOM.childNodes)
                                    // 缓存已经创建成功
                                    dispatch({ type: StatusEnum.CREATED, payload: { cacheId, doms } })
                                }
                            }}
                        >
                            {reactElement}
                        </div>
                    ))
            }
        </CacheContext.Provider >
    )
}

export default KeepAliveProvider