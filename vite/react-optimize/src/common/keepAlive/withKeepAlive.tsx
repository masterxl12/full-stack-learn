import { useCallback, useContext, useEffect, useRef } from "react"
import CacheContext from "./CacheContext"
import { StatusEnum } from "./typings"

const withKeepAlive = (OldComponent, { cacheId = window.location.pathname, scroll = false }) => {

    return (props) => {
        const { cacheStates, dispatch, mount, handleScroll } = useContext(CacheContext)
        const divRef = useRef<HTMLDivElement>(null)

        useEffect(() => {
            let cacheState = cacheStates[cacheId]
            // 如果已经创建成功 直接使用挂载
            if (cacheState && cacheState.doms && cacheState.status !== StatusEnum.DESTROY) {
                let doms = cacheState.doms;
                doms.forEach(dom => divRef.current.appendChild(dom))
                if (scroll) {
                    doms.forEach(dom => {
                        let scrollDom = cacheState.scrolls[dom]
                        if (scrollDom) {
                            dom.scrollTop = scrollDom
                        }
                    })
                }
            } else {
                // 如果没有创建 则去派生
                mount({ cacheId, reactElement: <OldComponent {...props} dispatch={dispatch} /> })
            }
        }, [mount, props, cacheStates])

        useEffect(() => {
            let onScroll = handleScroll.bind(null, cacheId)
            if (scroll) {
                divRef.current?.addEventListener('scroll', onScroll, true)
            }
            return () => { divRef.current?.removeEventListener('scroll', onScroll) }
        }, [handleScroll])

        return (
            <div id={`withKeepAlive-${cacheId}`} ref={divRef}>
                {/** 此处需要一个OldComponent渲染出来真实的DOM */}
            </div>
        )
    }
}

export default withKeepAlive

/**
 * 核心思路
 * 
 * 通过缓存容器去创建OldComponent对应的真实DOM,并且进行缓存
 * 并且这个OldComponent被销毁，缓存仍可以保留
 * 以后这个OldComponent再次渲染的时候，可以复用上次的缓存就可以
 * 
 */