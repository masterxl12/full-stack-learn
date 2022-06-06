function bindActionCreator(actionCreator, dispatch) {
    return function (...args) {
        const action = actionCreator.apply(this, ...args);
        dispatch(action);
    }
}

// 将action的创建者和dispatch绑定在一起
export default function bindActionCreators(actionCreators, dispatch) {
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