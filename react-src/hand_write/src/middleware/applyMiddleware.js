import { createStore, combinedReducer } from "../redux";
import compose from './compose';

function logger({ getState, dispatch }) {
    return (next) => { // 调和下一个中间件或是原始的store.dispatch方法
        return (action) => {
            console.log("::logger::start", getState());
            next(action)
            console.log("::logger::end", getState());
        }
    }
}

function reduxThunk({ getState, dispatch }) {// 改造后的dispatch方法
    return (next) => {// 调和下一个中间件或是原始的store.dispatch方法
        console.log(next === dispatch, "*********");
        // 以下部分是返回一个增强版的dispatch方法
        return (action) => {
            if (typeof action === "function") {
                // 如果action是一个函数，则直接执行
                return action(dispatch, getState);
            } else if (action.then && typeof action.then === "function") {
                return action.then(dispatch);
            } else {
                return next(action);
            }
        }
    }
}


function applyMiddleware(...middleWares) {
    return (createStore) => {
        return (reducer) => {
            const store = createStore(reducer);
            let dispatch;
            const middlewareAPI = {
                getState: store.getState,
                dispatch: (action) => dispatch?.(action)
            };
            let chain = middleWares.map(middleware => middleware(middlewareAPI));
            dispatch = compose(...chain)(store.dispatch);
            return {
                ...store,
                dispatch
            };
        }
    }
}

const store = applyMiddleware(reduxThunk)(createStore)(combinedReducer);
export default store