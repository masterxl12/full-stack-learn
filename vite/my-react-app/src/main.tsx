import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import TodoList from './components/TodoList'
import DomIndex from './components/Dom/index'
// import style from './assets/style.module.css'

const Text = () => {
  useEffect(() => {
    // fetch('/api/todos/1')
    console.log('**********88')
    fetch('/api/todos/1')
      .then((response) => response.json())
      .then((json) => console.log(json))
  }, [])

  return (
    <>
      {/* <div className={style.highlight}>css modules</div> */}
      <TodoList />
    </>
  )
}

ReactDOM.render(
  <React.StrictMode>
    <App>
      {/* <Text /> */}
      <DomIndex />
    </App>
  </React.StrictMode>,
  document.getElementById('root'),
)
