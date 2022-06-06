import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './redux/components/counter1'
import Counter2 from './redux/components/counter2'
import { Provider } from './react-redux'
import store from '././redux/store'

ReactDOM.render(<Provider store={store}>
  <Counter1 />
  <Counter2 />
</Provider>, document.getElementById("root"))