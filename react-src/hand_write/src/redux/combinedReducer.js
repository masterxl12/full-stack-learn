
// import counter1 from './reducer1';
// import counter2 from './reducer2';

// let rootReducer = combineReducers({
//     counter1,
//     counter2
// });

/**
 * 
 * @param {*} reducers 
 * @returns 返回一个新的reducer
 */
export default function combineReducer(reducers) {
    const reducerKeys = Object.keys(reducers);
    const finalReducers = {};
    reducerKeys.forEach(key => typeof reducers[key] === 'function' && (finalReducers[key] = reducers[key]));

    const finalReducerKeys = Object.keys(finalReducers);
    return function combination(state = {}, action) {
        let hasChanged = false;
        const nextState = {};
        finalReducerKeys.forEach(key => {
            const reducer = finalReducers[key];// counter1的处理函数
            const previousStateForKey = state[key];// 获取 老的counter1的状态
            const nextStateForKey = reducer(previousStateForKey, action);
            nextState[key] = nextStateForKey;
            hasChanged = hasChanged || nextStateForKey !== previousStateForKey;
        })
        return hasChanged ? nextState : state;
    }
}