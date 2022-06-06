import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import actions1 from '../store/actions/actions1'
import store from '../store'

const boundActions = bindActionCreators(actions1, store.dispatch);

export default function Counter1() {
    const [state, setState] = useState({ number: store.getState().counter1.number });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setState({ number: store.getState().counter1.number }));
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div>
            <p>{state.number}</p>
            <button onClick={boundActions.add1}>+</button>
            <button onClick={boundActions.minus1}>-</button>
        </div>
    )
}