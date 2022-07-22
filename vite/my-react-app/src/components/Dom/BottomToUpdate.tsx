import React, { useState, useRef, useEffect } from 'react';

import styles from './styles.module.less';

export const Bottom2Update = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const loadingRef = useRef<boolean>()
    const [list, setList] = useState<number[]>([1, 2, 3, 4])
    const [loading, setLoading] = useState<boolean>(false)
    const [pageNum, setPageNum] = useState<number>(0)

    loadingRef.current = loading

    useEffect(() => {
        containerRef.current?.addEventListener('scroll', scrollEvent);
        return () => {
            containerRef.current?.removeEventListener('scroll', scrollEvent)
        }
    }, []);

    useEffect(() => {
        getList()
    }, [pageNum])

    const getList = () => {
        setLoading(true)
        Promise.resolve([1, 2, 3, 4, 5]).then((res: any) => {
            const nowList = [...list, ...res]
            setList(nowList)
        }).finally(() => {
            setLoading(false)
        })
    }

    const scrollEvent = async () => {
        if (containerRef.current) {
            const { clientHeight, scrollTop, scrollHeight } = containerRef.current
            if (clientHeight + scrollTop >= scrollHeight) {
                console.log('到底。。。', clientHeight, scrollTop, scrollHeight);
                console.log(loadingRef.current);
                if (loadingRef.current) return
                setPageNum((pageNum) => pageNum + 1)
            }
        }
    }

    return <>
        <div className={styles.container} ref={containerRef}>
            {/* { loading && <img src='./logo.svg' /> } */}
            {
                list.map((item, index) => {
                    return <div key={index} className={styles.item}>{item}</div>
                })
            }
        </div>
    </>
}