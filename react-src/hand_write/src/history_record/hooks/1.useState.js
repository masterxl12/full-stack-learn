import React, { useState } from 'react'
import ReactDOM from 'react-dom'
// import React from './core/react'
// import ReactDOM from './core/react-dom'

// let lastState;
// function useState(initialState) {
//   let state = lastState || initialState;
//   function setState(newState) {
//     if (typeof newState === 'function') {
//       newState = newState(lastState);
//       if (Object.is(lastState, newState)) {
//         return
//       } else {
//         lastState = newState;
//       }
//     } else {
//       if (Object.is(lastState, newState)) {
//         return;
//       } else {
//         lastState = newState
//       }
//     }
//     _render();
//   }
//   return [state, setState]
// }

function Counter() {
  // const [count, setCount] = useState(0)
  const [info, setUserInfo] = useState({
    number: 0
  })
  // const alertNumber = () => {
  //   setTimeout(() => {
  //     console.log(count);
  //   }, 3000);
  // }

  // const handleClick = () => {
  //   setTimeout(() => {
  //     setCount(state => state + 1)
  //   }, 3000)
  // }


  const fnUpdate = () => {
    setUserInfo(prevState => {
      return { ...prevState, number: prevState.number + 1 }
    })
  }

  console.log("render again...");

  return (
    <div>
      {/* <p>{count}</p> */}
      {/* <button onClick={() => setCount(count + 1)}>+1</button>
      <button onClick={alertNumber}>alertNumber</button>
      <button onClick={handleClick}>add</button> */}
      <hr />
      <p>{info.number}</p>
      <button onClick={() => setUserInfo(info)}>用自己进行更新</button>
      <button onClick={() => setUserInfo({
        number: info.number + 1
      })}>变量+1</button>
      <button onClick={() => setUserInfo(info => info)}>用自己函数进行更新</button>
      <button onClick={fnUpdate}>函数进行更新</button>
    </div>
  )
}


function _render() {
  return ReactDOM.render(
    <Counter />, document.getElementById('root'));
}

_render()