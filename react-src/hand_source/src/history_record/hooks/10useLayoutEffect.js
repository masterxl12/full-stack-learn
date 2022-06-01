import React, { useEffect, useLayoutEffect } from 'react'
import ReactDOM from 'react-dom'

let hookIndex = 0;
let hookStates = [];
function fakeLayoutEffect(callback, dependencies) {
    let currentIndex = hookIndex;
    if (hookStates[hookIndex]) {
        let [destory, lastDeps] = hookStates[hookIndex];
        let same = dependencies && dependencies.every((item, index) => item === lastDeps[index]);
        if (!same) {
            destory && destory();
            Promise.resolve().then(() => {
                hookStates[currentIndex] = [callback(), dependencies]
            })
        }
    } else {
        Promise.resolve().then(() => {
            hookStates[currentIndex] = [callback(), dependencies]
        })
    }
    hookIndex++;
}

function App() {
    const divRef = React.useRef();

    useEffect(() => {
        divRef.current.style.transform = 'translate(500px)';
        divRef.current.style.transition = 'easeIn 1000ms'
    })

    // useLayoutEffect(() => {
    //   divRef.current.style.transform = 'translate(500px)';
    //   divRef.current.style.transition = 'all 1000ms'
    // })

    const styleCommon = {
        width: 100,
        height: 100,
        backgroundColor: '#ccc',
    }

    return (
        <div style={styleCommon} ref={divRef}>
        </div>
    );
}

ReactDOM.render(<App />, document.getElementById('root'))
