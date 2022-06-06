import React, { useContext, useEffect, useReducer } from 'react';
import { bindActionCreators } from '../redux';
import ReactReduxContext from './Context';

export default function (mapStateToProps, mapDispatchToProps) {
    return (WrappedComponent) => {
        /**
         * 1. 从context中获取store
         * 传属性3种
         *      1.传递属性
         *      2.mapsStateToProps(state)
         *      3.mapsDispatchToProps(dispatch)
         */
        return (props) => {
            const [, forceUpdate] = useReducer(x => x + 1, 0);
            const { store } = useContext(ReactReduxContext);

            const { getState, subscribe, dispatch } = store
            let prevState = getState();
            let stateProps = mapStateToProps(prevState);
            let dispatchProps;
            if (typeof mapDispatchToProps === 'function') {
                dispatchProps = mapDispatchToProps(dispatch);
            } else if (typeof mapDispatchToProps === 'object') {
                dispatchProps = bindActionCreators(mapDispatchToProps, dispatch);
            } else {
                dispatchProps = { dispatch }
            }

            useEffect(() => {
                subscribe(() => forceUpdate());
            }, [subscribe])

            return <WrappedComponent {...props} {...stateProps} {...dispatchProps} />
        }

    }
}