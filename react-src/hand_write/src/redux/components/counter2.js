import React, { useEffect, useState } from 'react';
import { bindActionCreators } from 'redux';
import actions2 from '../store/actions/actions2'
import store from '../store'

const boundActions = bindActionCreators(actions2, store.dispatch);

export default function Counter2() {
    const [state, setState] = useState({ number: store.getState().counter2.number });

    useEffect(() => {
        const unsubscribe = store.subscribe(() => setState({ number: store.getState().counter2.number }));
        return () => {
            unsubscribe();
        }
    }, [])

    return (
        <div>
            <p>{state.number}</p>
            <button onClick={boundActions.add2}>+</button>
            <button onClick={boundActions.minus2}>-</button>
        </div>
    )
}