import React from 'react';
import ReactReduxContext from '../Context';

export default function useDispatch() {
    const value = React.useContext(ReactReduxContext);
    return value.store.dispatch;
}