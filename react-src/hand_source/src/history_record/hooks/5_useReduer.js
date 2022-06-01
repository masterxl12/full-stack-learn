import React from 'react'
import ReactDOM from 'react-dom'

function reducer(oldState, action) {
  const { type } = action
  switch (type) {
    case "ADD":
      return { ...oldState, number: oldState.number + 1 }
    case "SUBTRACT":
      return { ...oldState, number: oldState.number - 1 }
    default:
      return oldState
  }
}

let lastState
function fakeUseReducer(reducer, initialState) {
  lastState = lastState || initialState;
  function dispatch(action) {
    if (reducer) {
      lastState = reducer(lastState, action)
    } else {
      lastState = action
    }
    render()
  }
  return [lastState, dispatch]
}

function fakeUseState(initialState) {
  return fakeUseReducer(null, initialState);
}

let info = { number: 0 }
function Counter() {
  // const [count, dispatch] = React.useReducer(reducer, info)
  // const [count, dispatch] = fakeUseReducer(reducer, info)
  // const [count, setCount] = fakeUseReducer(null, info)
  const [count, setCount] = fakeUseState(info)

  return (
    <>
      <p>
        {count.number}
      </p>
      {/* <button onClick={() => dispatch({ type: "ADD" })}>useReducer+1</button> */}
      {/* <button onClick={() => dispatch({ type: "SUBTRACT" })}>useReducer-1</button> */}
      <button onClick={() => setCount({ number: count.number + 1 })}>useState+1</button>
    </>
  )
}

function render() {
  ReactDOM.render(<Counter />, document.getElementById('root'))
}

render()