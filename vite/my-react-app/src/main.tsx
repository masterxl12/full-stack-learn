import React, { useEffect } from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Bottom2Update } from './components/Dom/BottomToUpdate'
import { ImgLazyLoad } from './components/Dom/ImgLazyLoad'
import { LeftSideBar } from './config/LeftSideBar'
// import TodoList from './components/TodoList'
// import DomIndex from './components/Dom/index'
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

interface IProps {
  children: React.ReactNode
}

ReactDOM.render(
  <React.StrictMode>
    <App>
      {/* <LeftSideBardeBar /> */}
      {/* <Text /> */}
      {/* <Bottom2Update />

      <ImgLazyLoad /> */}
    </App>
  </React.StrictMode>,
  document.getElementById('root'),
)
