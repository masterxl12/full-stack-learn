import React, { useState, useEffect } from 'react'
import ReactDOM from 'react-dom'

let destory;
let lastDeps
function fakeUseEffect(callback, deps) {
  if (lastDeps) {
    if (lastDeps !== deps) {
      destory();
      destory = callback(); // 重新执行 得到新的销毁函数
      lastDeps = deps
    }
  } else {
    destory = callback();
    lastDeps = deps
  }
}

function Counter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("start...");
    let timerId = setInterval(() => {
      setCount(c => c + 1)
    }, 1000)
    return () => {
      console.log("end...");
      clearInterval(timerId)
    }
  }, []);

  return (
    <div>
      <p>You clicked {count} times</p>
      <button onClick={() => setCount(count + 1)}>
        Click me
      </button>
    </div>
  );
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

render()