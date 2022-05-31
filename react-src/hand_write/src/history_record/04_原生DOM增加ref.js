// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let commonStyle = { border: '1px solid #ccc', padding: '10px' }

class Link extends React.Component {
  constructor(props) {
    super(props)
    this.props = props
    this.state = { number: 0 }
    this.a = React.createRef()
    this.b = React.createRef()
    this.result = React.createRef()
  }
  // 1. 箭头函数 -> 推荐写法 不会每次生成新的函数 提高性能·
  // 2. bind(构造函数中使用this)
  // 3. 匿名函数
  handleClick = (event) => {
    let a = this.a.current.value;
    let b = this.b.current.value;
    this.result.current.value = a + b;
  }

  render() {
    return (
      <>
        <input ref={this.a} /> + <input ref={this.b} /><button onClick={this.handleClick}>=</button> <input ref={this.result} />
      </>
    )
  }
}

ReactDOM.render(<Link />, document.getElementById('root'))