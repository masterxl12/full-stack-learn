import React from 'react';
import ReactReduxContext from '../Context';

export default function useReduxContext() {
    const value = React.useContext(ReactReduxContext);
    return value;
}