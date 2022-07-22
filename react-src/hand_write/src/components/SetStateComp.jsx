import React from 'react'
import ReactDOM from 'react-dom'

let commonStyle = { border: '1px solid #ccc', padding: '10px' }

export default class Counter extends React.Component {
    constructor(props) {
        super(props)
        this.props = props
        this.state = { number: 0, name: 'world!!!' }

    }
    handleClick = (event) => {
        // this.setState({ number: this.state.number + 1 })
        // console.log(this.state.number);
        // this.setState({ number: this.state.number + 1 })
        // console.log(this.state.number);
        this.setState(prevState => ({ number: prevState.number + 1 }))
        console.log(this.state.number);

        this.setState(prevState => ({ number: prevState.number + 1 }))
        console.log(this.state.number);

        this.setState({ number: this.state.number + 1 })
        console.log(this.state.number);

        this.setState({ number: this.state.number + 1 })
        console.log(this.state.number);

        setTimeout(() => {
            this.setState({ number: this.state.number + 1 })
            console.log(this.state);
            this.setState({ number: this.state.number + 1 })
            console.log(this.state, "setTimeout...");
        }, 1000);
    }
    // 0 0 0 0 2

    render() {
        console.log("次数。。。");

        return (
            <div style={commonStyle}>
                <div id="C1" style={commonStyle}>
                    {this.props.name}
                </div>
                {this.props.children}
                <button onClick={this.handleClick}>类组件+</button>
            </div>
        )
    }
}

// ReactDOM.render(<Counter name="counter"></Counter>, document.getElementById('root'))