import React, { useEffect, useState } from 'react';
import ReactDOM from 'react-dom';
import Counter1 from './redux/components/counter1'
import Counter2 from './redux/components/counter2'

ReactDOM.render(<>
  <Counter1 />
  <Counter2 />
</>, document.getElementById("root"))