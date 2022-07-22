import React, { useEffect, useState } from "react";

interface IViewListProps {
    itemCount: Number
    width: String | Number
    containerHeight: Number
    itemSize: Number
    children?: React.ReactNode
}

export const ViewList: React.FC<IViewListProps> = ({
    itemCount,
    width,
    containerHeight,
    itemSize,
}) => {
    const [start, setStart] = useState<Number>(0)
    const [end, setEnd] = useState<Number>(0)
    const [viewList, setViewList] = useState<any[]>([])

    const commonStyle = { position: 'absolute', top: 0, left: 0, width: '100%', height: itemSize };

    useEffect(() => {
        let end = start + Math.floor(containerHeight / itemSize) + 1
        end = end > itemCount ? itemCount : end;
        setEnd(end)
    }, [start])

    useEffect(() => {
        const visibleList = new Array(end - start).fill(0).map((item, index) => ({ index: start + index, bgColor: getRandomColor() }));
        setViewList(visibleList)
    }, [start, end])

    const onScrollHandler = (event) => {
        let start = Math.floor(event.currentTarget?.scrollTop / itemSize)
        setStart(start)
    }

    const getRandomColor = () => {
        let randomNum = Math.floor(Math.random() * 0xFFFFFF).toString(16).toLowerCase();
        if (randomNum.length === 6) return `#${randomNum}`
        return getRandomColor()
    }

    return <div onScroll={onScrollHandler} style={{
        overflow: 'auto',
        willChange: 'transform',
        height: containerHeight,
        width,
    }}>
        <div style={{ ...commonStyle, height: itemSize * itemCount }}>
            {
                viewList.map((item, index) => (<div key={index} style={{
                    ...commonStyle,
                    top: item.index * itemSize,
                    backgroundColor: item.index % 2 === 0 ? '#ffedfa' : '#eee',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                }}>{item.index}</div>))
            }
        </div>
    </div>
}