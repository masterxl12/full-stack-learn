// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let commonStyle = { border: '1px solid red', margin: '5px' }
let ele = (
  <div id="A1" style={commonStyle}>
    {100}
    <div id="B1" style={commonStyle}>
      B1
      <div id="C1" style={commonStyle}>
        C1
      </div>
      <div id="C2" style={commonStyle}>
        C2
      </div>
    </div>
    <div id="B2" style={commonStyle}>
      B2
      <div id="D1">D1</div>
      <div id="D2">D2</div>
    </div>
  </div>
)

let FunctionComponent = (props) => {
  return (
    <div>
      <div id="C1" style={commonStyle}>
        {props.name}
      </div>
      {props.children}
    </div>
  )
}

class ClassComponent extends React.Component {
  render() {
    return (
      <div>
        <div id="C1" style={commonStyle}>
          {this.props.name}
        </div>
        {this.props.children}
      </div>
    )
  }
}

// 函数组件
console.log("🚀 ~ file: index.js ~ line 53 ~ FunctionComponent", FunctionComponent)
ReactDOM.render(
  <FunctionComponent name="hello world">
    <p>children</p>
  </FunctionComponent>,
  document.getElementById('root'),
)

// 类组件
let ClasssInComponent = <ClassComponent name="hello world"><p>1234</p></ClassComponent>
console.log("🚀 ~ file: index.js ~ line 62 ~ ClasssInComponent", ClasssInComponent)
ReactDOM.render(ClasssInComponent, document.getElementById('root'))