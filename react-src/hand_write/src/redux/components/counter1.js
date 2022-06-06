import React from 'react';
import actions1 from '../store/actions/actions1'
import store from '../store'
import { connect } from '../../react-redux';

class Counter1 extends React.Component {
    render() {
        const { number, add1, minus1 } = this.props;
        return (
            <div>
                <p>{number}</p>
                <button onClick={add1}>+</button>
                <button onClick={minus1}>-</button>
            </div>
        )
    }
}

export default connect(
    state => state.counter1,
    actions1
)(Counter1)

// export default function Counter1() {
//     const [state, setState] = useState({ number: store.getState().counter1.number });

//     useEffect(() => {
//         const unsubscribe = store.subscribe(() => setState({ number: store.getState().counter1.number }));
//         return () => {
//             unsubscribe();
//         }
//     }, [])

//     return (
//         <div>
//             <p>{state.number}</p>
//             <button onClick={boundActions.add1}>+</button>
//             <button onClick={boundActions.minus1}>-</button>
//         </div>
//     )
// }