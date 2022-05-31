import React, { useState, useEffect, useImperativeHandle } from 'react'
import ReactDOM from 'react-dom'

let lastRef;
function fakeUseRef(initialRef = { current: null }) {
    lastRef = lastRef || initialRef;
    return lastRef;
}

function Child(props, forwardRef) {
    const inputRef = React.useRef();
    // parama1: 转发的forwardRef对象 params2: 工厂函数 返回的是一个对象
    useImperativeHandle(forwardRef, () => ({
        focus() {
            inputRef.current.focus();
        }
    }));
    return (
        <div>
            <input ref={forwardRef} />
            <button onClick={props.getFocus}>点我啊</button>
        </div>
    )
}

const ForwardedChild = React.forwardRef(Child);

function App() {
    const inputRef = React.useRef();
    const [id, setId] = useState(0);

    const getFocus = () => {
        inputRef.current.focus();
        // inputRef.current.parentNode.removeChild(inputRef.current)
    }

    return (
        <div>
            <p>id:{id}</p>
            {/* <button onClick={() =}>点击</button> */}
            <button onClick={() => setId(id + 1)}>
                Click me
            </button>
            <hr />
            <ForwardedChild ref={inputRef} getFocus={getFocus} />
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
