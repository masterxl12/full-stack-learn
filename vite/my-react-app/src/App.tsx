import { useState } from 'react'
// import './App.css'
interface AppPops {
  children: React.ReactNode
  style?: React.CSSProperties
  className?: string
}

function App(props: AppPops) {
  return <div className="App">
    {props.children}
  </div>
}

export default App
