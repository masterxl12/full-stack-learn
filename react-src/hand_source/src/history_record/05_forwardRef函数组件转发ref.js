// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let commonStyle = { border: '1px solid #ccc', padding: '10px' }

let InputFunction = React.forwordRef((props, ref) => {
  console.log(props);
  return <input ref={ref} />
})

class MyLink extends React.Component {

  constructor() {
    super()
    this.classInput = React.createRef();
  }
  getFocus = () => {
    this.classInput.current.focus()
  }

  render() {
    return (
      <>
        <InputFunction ref={this.classInput} name="wangshaoni" />
        <button onClick={this.getFocus}>提交</button>
      </>
    )
  }
}

class InputText extends React.Component {
  constructor(props) {
    super()
    this.props = props
    this.input = React.createRef()
  }

  getFocus = (event) => {
    this.input.current.focus()
  }

  render() {
    return (
      <>
        <input ref={this.input} />
      </>
    )
  }
}

ReactDOM.render(<MyLink />, document.getElementById('root'))