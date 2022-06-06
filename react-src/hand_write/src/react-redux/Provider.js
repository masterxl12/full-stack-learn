import React from 'react';
import ReactReduxContext from './Context';
import Subscription from './utils/Subscription';

export default function (props) {
    let store = props.store;
    const subscription = new Subscription(store);
    let value = { store, subscription }
    return (
        <ReactReduxContext.Provider value={value}>
            {
                props.children
            }
        </ReactReduxContext.Provider>
    )
}
