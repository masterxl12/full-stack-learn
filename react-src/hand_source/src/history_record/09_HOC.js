import React from 'react'
import ReactDOM from 'react-dom'
// import React from './core/react'
// import ReactDOM from './core/react-dom'

function withTracker(OldComponent) {
  return class extends React.Component {
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
          <OldComponent {...this.state} />
        </div>
      )
    }
  }
}

function Show(props) {
  return (
    <>
      <h1>mouse leave</h1>
      <p>x:{props.x} y:{props.y}</p>
    </>
  )
}

let HighShow = withTracker(Show)
ReactDOM.render(
  <HighShow />, document.getElementById('root'));