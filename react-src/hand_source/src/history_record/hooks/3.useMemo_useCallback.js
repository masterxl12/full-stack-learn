import React from 'react'
import ReactDOM from 'react-dom'
// import React from './core/react'
// import ReactDOM from './core/react-dom'

let hookStates = [];
let hookIndex = 0;
function useState(initialState) {
  hookStates[hookIndex] = hookStates[hookIndex] || initialState;
  let currentIndex = hookIndex;
  function setState(newState) {
    hookStates[currentIndex] = newState
    ReactDOM.render(<App />, rootElement);
    hookIndex = 0
  }
  return [hookStates[hookIndex++], setState]
}

function useCallback(callback, deps) {
  if (hookStates[hookIndex]) {
    let [lastCallback, lastCallbackDeps] = hookStates[hookIndex];
    let same = deps.every((item, index) => item === lastCallbackDeps[index])
    if (same) {
      return lastCallback
    } else {
      hookStates[hookIndex++] = [callback, deps]
      return callback
    }
  } else {
    hookStates[hookIndex++] = [callback, deps]
    return callback;
  }
}
function useMemo(factory, deps) {
  if (hookStates[hookIndex]) {
    let [lastMemo, lastDeps] = hookStates[hookIndex];
    let same = deps.every((item, index) => item === lastDeps[index])
    if (same) {
      return lastMemo
    } else {
      let newMemo = factory();
      hookStates[hookIndex++] = [newMemo, deps];
      return newMemo
    }
  } else {
    let newMemo = factory();
    hookStates[hookIndex++] = [newMemo, deps]
    return newMemo;
  }
}

function App() {
  const [count, setCount] = useState(0)

  const add1 = useCallback(() => setCount(count + 1), [count])
  const add2 = useCallback(() => setCount(count + 3), [count])

  const d1 = useMemo(() => ({ count }), [count])
  const d2 = useMemo(() => ({ count: `-${count}` }), [count])
  return (
    <div>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>变量+1</button>
      <ChildCount add1={add1} add2={add2} d1={d1.count} d2={d2.count} />
    </div>
  )
}

function ChildCount(props) {
  return (
    <div>
      <h1>{props.d1}</h1>
      <h1>{props.d2}</h1>
      <button onClick={props.add1}>add1</button>
      <button onClick={props.add2}>add2</button>
    </div>
  )
}

const rootElement = document.getElementById("root");
ReactDOM.render(<App />, rootElement);
