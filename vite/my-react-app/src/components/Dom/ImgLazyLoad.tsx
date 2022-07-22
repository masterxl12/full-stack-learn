import React, { useState, useRef, useEffect } from 'react';
import styles from './styles.module.less';

export const ImgLazyLoad = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const imgListRef = useRef<HTMLImageElement[]>(null)

    useEffect(() => {
        containerRef.current?.addEventListener("scroll", throttle(lazyLoad, 200));
        imgListRef.current = document.querySelectorAll('img')

        return () => {
            containerRef.current?.removeEventListener('scroll', throttle(lazyLoad, 200))
        }
    }, []);

    const lazyLoad = () => {
        imgListRef.current.forEach((imgItem) => {
            if (!imgItem.dataset.src) return;
            let { bottom, top } = imgItem.getBoundingClientRect();
            if (bottom >= 0 && top < containerRef.current?.clientHeight) {
                imgItem.src = imgItem.dataset.src;
                imgItem.removeAttribute("data-src");
            }
        });
    };

    let throttle = (fn, delay) => {
        let flag = false;
        return (...rest) => {
            if (flag) return;
            flag = true;
            setTimeout(() => {
                fn(...rest);
                flag = false;
            }, delay);
        };
    };

    return <>
        <div className={styles.outer} ref={containerRef}>
            <img src="./imgs/loading1.gif" data-src="./imgs/1.jpeg" alt="" />
            <img src="./imgs/loading1.gif" data-src="./imgs/2.jpeg" alt="" />
            <img src="./imgs/loading1.gif" data-src="./imgs/3.jpeg" alt="" />
            <img src="./imgs/loading1.gif" data-src="./imgs/4.jpeg" alt="" />
        </div>
    </>
}