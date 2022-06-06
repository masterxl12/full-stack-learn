import React, { Component, useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
const INCREMENT = 'ADD';
const DECREMENT = 'MINUS';

const reducer = (state = initState, action) => {
    switch (action.type) {
        case INCREMENT:
            return { number: state.number + 1 };
        case DECREMENT:
            return { number: state.number - 1 };
        default:
            return state;
    }
}
let initState = { number: 0 };
const store = createStore(reducer, initState);

export default class Counter extends Component {
    unsubscribe;
    constructor(props) {
        super(props);
        this.state = { number: 0 };
    }
    componentDidMount() {
        console.log(store);
        this.unsubscribe = store.subscribe(() => this.setState({ number: store.getState().number }));
    }
    componentWillUnmount() {
        this.unsubscribe();
    }
    render() {
        return (
            <div>
                <p>{this.state.number}</p>
                <button onClick={() => store.dispatch({ type: 'ADD' })}>+</button>
                <button onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
            </div>
        )
    }
}


function Counter1() {
    const [state, setState] = useState({ number: store.getState().number });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setState({ number: store.getState().number }));
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div>
            <p>{state.number}</p>
            <button onClick={() => store.dispatch({ type: 'ADD' })}>+</button>
            <button onClick={() => store.dispatch({ type: 'MINUS' })}>-</button>
        </div>
    )
}

ReactDOM.render(<Counter1 />, document.getElementById("root"))