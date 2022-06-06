// import { combineReducers } from 'redux';
import combineReducers from '../../combinedReducer';
import counter1 from './reducer1';
import counter2 from './reducer2';

let rootReducer = combineReducers({
    counter1,
    counter2
});

export default rootReducer;