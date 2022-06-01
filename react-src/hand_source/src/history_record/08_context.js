// import React from 'react'
// import ReactDOM from 'react-dom'
import React from './core/react'
import ReactDOM from './core/react-dom'

let ThemeContext = React.createContext();
console.log(ThemeContext);
const { Provider, Consumer } = ThemeContext;

let style = { margin: '5px', padding: '5px' };
function Title(props) {
  console.log('Title');
  return (
    <Consumer>
      {
        (contextValue) => (
          <div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
            Title
          </div>
        )
      }
    </Consumer>
  )
}

function Header() {
  return (
    <Consumer>
      {
        (contextValue) => (<div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
          Header
          <Title />
        </div>)
      }
    </Consumer>
  )
}

// class Header extends React.Component {
//   // 如果给类组件增加一个静态属性 contextType
//   // 那么就可以通过this.context这个属性来获取 provider 里面的value
//   static contextType = ThemeContext
//   render() {
//     console.log('Header');
//     return (
//       <div style={{ ...style, border: `5px solid ${this.context.color}` }}>
//         Header
//         <Title />
//       </div>
//     )
//   }
// }

function Content() {
  console.log('Content');
  return (
    <Consumer>
      {
        (contextValue) => (
          <div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
            Content
            <button style={{ color: 'red' }} onClick={() => contextValue.changeColor('red')}>变红</button>
            <button style={{ color: 'green' }} onClick={() => contextValue.changeColor('green')}>变绿</button>
          </div>
        )
      }
    </Consumer>
  )
}

function Main() {
  return <Consumer>
    {
      contextValue => (
        <div style={{ ...style, border: `5px solid ${contextValue.color}` }}>
          Main
          <Content />
        </div>
      )
    }
  </Consumer>
}

// class Main extends React.Component {
//   static contextType = ThemeContext
//   render() {
//     console.log('Main');
//     return (
//       <div style={{ ...style, border: `5px solid ${this.context.color}` }}>
//         Main
//         <Content />
//       </div>
//     )
//   }
// }

class Page extends React.Component {
  constructor(props) {
    super(props);
    this.state = { color: 'black' };
  }
  changeColor = (color) => {
    this.setState({ color });
  }
  render() {
    let contextValue = { color: this.state.color, changeColor: this.changeColor };
    return (
      <Provider value={contextValue}>
        <div style={{ ...style, width: '250px', border: `5px solid ${this.state.color}` }}>
          Page
          <Header />
          <Main />
        </div>
      </Provider >
    )
  }
}
ReactDOM.render(
  <Page />,
  document.getElementById('root')
);