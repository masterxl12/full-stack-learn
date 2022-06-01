// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let commonStyle = { border: '1px solid #ccc', padding: '10px' }
class MyLink extends React.Component {
  constructor() {
    super()
    this.state = { number: 0 };
    console.log("1. ClasssInComponent Create");
  }

  componentWillMount() {
    console.log("2. ComponentWillMount");
  }

  shouldComponentUpdate() {
    console.log("5. 询问用户是否需要更新 ShouldComponentUpdate");
    return this.state.number % 2 === 0 // 偶数更新
  }

  componentWillUpdate() {
    console.log("6.组件将要更新...");
  }

  componentDidUpdate() {
    console.log("7.组件更新完成...");
  }

  componentDidMount() {
    console.log("4. ComponentDidMount");
  }

  handleClick = () => {
    this.setState({ number: this.state.number + 1 })
  }

  render() {
    console.log("3.render");
    return (
      <>
        <p>{this.state.number}</p>
        <button onClick={this.handleClick}>+1</button>
        {
          this.state.number > 3 ? null : <ChildCount count={this.state.number} />
        }
      </>
    )
  }
}

class ChildCount extends React.Component {
  componentWillMount() {
    console.log("childCount 1.子组件将要挂载");
  }
  componentDidMount() {
    console.log("childCount 3.子组件挂载完成");
  }
  componentWillUpdate() {
    console.log("childCount 4.子组件将要挂载");
  }
  shouldComponentUpdate(nextProps, nextState) {
    console.log("childCount 5.子组件询问是否更新...");
    return nextProps % 3 === 0
  }
  componentDidUpdate() {
    console.log("childCount 6.子组件将要挂载");
  }
  componentWillReceiveProps(nextProps) {
    console.log("childCount 7.子组件接收新属性");
  }
  componentWillUnmount() {
    console.log("childCount 8.子组件将卸载...");
  }
  render() {
    console.log("childCount 2. 子组件render...");
    return (
      <div>{this.props.count}</div>
    )
  }
}

ReactDOM.render(<MyLink />, document.getElementById('root'))
