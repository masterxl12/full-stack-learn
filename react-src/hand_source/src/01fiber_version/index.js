// import React, { useState } from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom-fiber'

let commonStyle = { border: '1px solid red', margin: '5px' }
let ele = (
  <div id="A1" style={commonStyle}>
    A1
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

console.log(ele)
ReactDOM.render(ele, document.getElementById('root'))

let render2 = document.getElementById('render2')
render2.addEventListener('click', () => {
  let ele2 = (
    <div id="A1-new" style={commonStyle}>
      A1-new
      <div id="B1-new" style={commonStyle}>
        B1-new
        <div id="C1-new" style={commonStyle}>
          C1-new
        </div>
        <div id="C2-new" style={commonStyle}>
          C2-new
        </div>
      </div>
      <div id="B2-new" style={commonStyle}>
        B2
        <div id="D1-new">D1-new</div>
        <div id="D2-new">D2-new</div>
        <div id="D3-new">D3-new</div>
      </div>
    </div>
  )
  ReactDOM.render(ele2, document.getElementById('root'))
})

let render3 = document.getElementById('render3')
render3.addEventListener('click', () => {
  let ele3 = (
    <div id="A1-new" style={commonStyle}>
      A1-new
      <div id="B1-new" style={commonStyle}></div>
      <div id="B2-new" style={commonStyle}>
        B2
        <div id="D1-new">D1-new</div>
        <div id="D2-new">D2-new</div>
      </div>
    </div>
  )
  ReactDOM.render(ele3, document.getElementById('root'))
})
