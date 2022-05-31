import React from 'react';
import Button, { ButtonSize, ButtonType } from './components/Button/button';

function App() {
  return (
    <div className="App">
      <Button autoFocus>Hello</Button>
      <Button onClick={e => {
        e.preventDefault()
        alert(123)
      }} btnType={ButtonType.Primary} size={ButtonSize.Large}>Large Button</Button>
      <Button btnType={ButtonType.Primary} disabled>Disabled Button</Button>
      <Button btnType={ButtonType.Danger}>Danger Button</Button>
      <Button btnType={ButtonType.Link} href="http://www.baidu.com" target="_blank" >Baidu Link</Button>
      <header className="App-header">
        <p>
          Edit <code>src/App.tsx</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
    </div>
  );
}

export default App;
