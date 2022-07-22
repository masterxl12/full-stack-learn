import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './redux/components/counter1'
import Counter2 from './redux/components/counter2'
import SetStateComp from './components/SetStateComp';
import FuncCounter from './components/UseStateFunc';
import { Provider } from './react-redux'
import store from '././redux/store'

ReactDOM.render(<Provider store={store}>
  <hr />
  <SetStateComp />
  <hr />
  <FuncCounter />
  <hr />
  <Counter1 />
  <Counter2 />
</Provider>, document.getElementById("root"))