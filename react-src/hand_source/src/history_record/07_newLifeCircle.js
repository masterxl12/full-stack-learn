// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let commonStyle = {
  height: '100px',
  width: '200px',
  border: '1px solid red',
  overflow: 'auto'
}
class ScrollingList extends React.Component {
  constructor() {
    super()
    this.wrapper = React.createRef()
    this.state = { messages: [] };
  }

  addMessage = () => {
    const { messages } = this.state
    this.setState({ messages: [`${messages.length}`, ...messages] })
  }

  componentDidMount() {
    this.timeID = setInterval(() => {//设置定时器
      this.addMessage();
    }, 1000)
  }

  componentDidUpdate(pervProps, pervState, { prevScrollHeight, prevScrollTop }) {
    //当前向上卷去的高度加上增加的内容高度
    this.wrapper.current.scrollTop = prevScrollTop + (this.wrapper.current.scrollHeight - prevScrollHeight);
  }

  getSnapshotBeforeUpdate() {
    return {
      prevScrollTop: this.wrapper.current.scrollTop,
      prevScrollHeight: this.wrapper.current.scrollHeight,
    }
  }

  componentWillUnmount() {//清除定时器
    clearInterval(this.timeID);
  }

  render() {
    return (
      <div ref={this.wrapper} style={commonStyle}>
        {
          this.state.messages.map((message, index) => (
            (<div key={index}>{message}</div>)
          ))
        }
      </div>
    )
  }
}

ReactDOM.render(<ScrollingList />, document.getElementById('root'))