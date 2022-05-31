import React from 'react'
import ReactDOM from 'react-dom'

class PureComponent extends React.Component {
  shouldComponentUpdate(nextProps, nextState) {
    // 浅比较
    if (this.props === nextProps) {
      return false;
    }
    if (Object.keys(this.props).length !== Object.keys(nextProps).length) {
      return true
    }
    if (!nextProps || !this.props) return true
    for (let key in this.props) {
      if (this.props[key] !== nextProps[key]) return true
    }
    return false;
    // return nextProps !== this.props || nextState !== this.state
  }
}

function memo(OldComponent) {
  return class extends PureComponent {
    render() {
      return <OldComponent {...this.props} />
    }
  }
}