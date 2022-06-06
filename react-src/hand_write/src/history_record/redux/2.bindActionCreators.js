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

function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        const action = actionCreator.apply(this, ...args);
        dispatch(action);
    }
}

// 将action的创建者和dispatch绑定在一起
function bindActionCreators(actionCreators, dispatch) {
    if (typeof actionCreators === 'function') {
        return bindActionCreator(actionCreators, dispatch);
    }

    const ret = {};
    for (let key in actionCreators) {
        const actionCreator = actionCreators[key];
        ret[key] = bindActionCreator(actionCreator, dispatch);
    }
    return ret;
}

const add = () => ({ type: INCREMENT });
const minus = () => ({ type: DECREMENT });

const actions = { add, minus }
// 将一个对象返回一个新对象 新对象中的所有方法都被改造过 被重新赋值
const boundActions = bindActionCreators(actions, store.dispatch);
console.log(boundActions);

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
            <button onClick={boundActions.add}>+</button>
            <button onClick={boundActions.minus}>-</button>
        </div>
    )
}

ReactDOM.render(<Counter1 />, document.getElementById("root"))