import React from 'react';
import ReactReduxContext from '../Context';

export default function useStore() {
    const value = React.useContext(ReactReduxContext);
    return value.store;
}