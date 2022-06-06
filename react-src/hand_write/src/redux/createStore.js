import ActionTypes from "./utils/ActionTypes";

export default function createStore(reducer, preloadedState) {
    let currentReducer = reducer;
    let currentState = preloadedState;
    let currentListeners = [];
    function getState() {
        return currentState
    }

    function subscribe(listener) {
        currentListeners.push(listener)
        return () => {
            currentListeners = currentListeners.filter(l => l !== listener)
        }
    }

    function dispatch(action) {
        currentState = currentReducer(currentState, action)
        currentListeners.forEach(l => l())
        return action
    }

    dispatch({ type: ActionTypes.INIT });
    return {
        getState,
        dispatch,
        subscribe
    }
}