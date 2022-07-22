import React, { useReducer } from 'react'
import ReactDOM from 'react-dom'

const CounterContext = createContext();

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

function createContext() {
  let currentValue;
  function Provider(props) {
    currentValue = props.value;
    return props.children
  }

  let context = {
    Provider,
    get _currentValue() {
      return currentValue
    }
  }

  return context
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

function fakeUseContext(Context) {
  return Context._currentValue
}

let info = { number: 0 }
function App() {
  const [state, dispatch] = fakeUseReducer(reducer, info)
  const contextValue = { state, dispatch }
  return (
    <CounterContext.Provider value={contextValue}>
      <h2>****{state.number}****</h2>
      <Counter />
    </CounterContext.Provider>
  )
}

function Counter() {
  // const { state, dispatch } = React.useContext(CounterContext)
  const { state, dispatch } = fakeUseContext(CounterContext)
  return (
    <>
      <p>
        {state.number}
      </p>
      <button onClick={() => dispatch({ type: "ADD" })}>useContext+1</button>
      <button onClick={() => dispatch({ type: "SUBTRACT" })}>useContext-1</button>
    </>
  )
}

function render() {
  ReactDOM.render(<App />, document.getElementById('root'))
}

render()