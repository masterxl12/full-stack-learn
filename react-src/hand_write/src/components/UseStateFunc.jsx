import React, { forwardRef, useRef, useState, useImperativeHandle } from 'react'
import useSyncCallback from '../history_record/hooks/diyHooks/useSyncCallback'

const FuncCounter = () => {
    const childRef = useRef(null)
    const [number, setNumber] = useState(0)
    const [obj, setObj] = useState({
        name: "hello",
        number: 0
    })

    const handleClick = () => {
        setObj({
            number: obj.number + 1
        })
        // console.log("*******");
        // func();
        // console.log("======");
        // setNumber(c => c + 1)
        // setNumber(c => c + 1)
        setTimeout(() => {
            // console.log(number, "hahaha...");
            setNumber(c => c + 1)
            setNumber(c => c + 1)
            // console.log(number, "wawawa...");
        }, 1000);
    }

    const ref = useRef(0);
    const refChange = () => {
        ref.current += 1;
        console.log(ref, "ref...");
    }

    let func = useSyncCallback(() => {
        console.log(obj, "同步数据。。。");
    })

    const forwardRefChange = () => {
        console.log(childRef.current, "childRef.current");
    }

    console.log("组件渲染。。。");
    return <>
        <div>1234...{number}</div>
        <div>ref.current...{ref.current}</div>
        <Child name="child name..." age="10" ref={childRef} />
        <button onClick={forwardRefChange}>forwardRef组件</button>
        <button onClick={handleClick}>函数组件+</button>
        <button onClick={refChange} style={{ marginLeft: 10 }}>refChange+</button>
    </>
}

const Child = React.forwardRef((props, ref) => {
    console.log(props);

    const onChange = () => {
        console.log(1234);
    }

    useImperativeHandle(ref, () => ({
        focus: () => {
            ref.current.focus()
        },
        onChange,
    }))


    // return <div className='child' {...props} ref={ref}>123</div>
    return <input ref={ref} onChange={onChange} />
})

export default FuncCounter