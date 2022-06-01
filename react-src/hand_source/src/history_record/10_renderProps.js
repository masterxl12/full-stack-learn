import React from 'react'
import ReactDOM from 'react-dom'
// import React from './core/react'
// import ReactDOM from './core/react-dom'

class MouseTracker extends React.Component {
  constructor(props) {
    super(props);
    this.state = { x: 0, y: 0 };
  }
  handleMouseMove = (event) => {
    this.setState({
      x: event.clientX,
      y: event.clientY
    });
  }

  render() {
    return (
      <div onMouseMove={this.handleMouseMove}>
        {
          this.props.render(this.state)
        }
      </div>
    )
  }
}

ReactDOM.render(
  <MouseTracker render={params => (
    <>
      <h1>移动鼠标:</h1>
      <p>鼠标位置:{params.x},{params.y}</p>
    </>
  )} />, document.getElementById('root'));