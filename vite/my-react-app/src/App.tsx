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
    <A render={(info: BProps) => <B {...info}></B>} />
  </div>
}



const A: React.FC<{ render: Function }> = ({ render }) => {
  const [info, setInfo] = useState<BProps>({
    name: 'hello A...',
    bar: "render props..."
  })
  return <div style={{ background: '#ccc' }}>
    <h1>A...</h1>
    {render(info)}
  </div>
}
interface BProps {
  name: string
  bar: string
}

const B: React.FC<BProps> = ({
  name, bar
}) => {
  return <div style={{ background: 'skyblue' }}>
    <h1>B...</h1>
    <p>name:{name},bar:{bar}</p>
  </div>
}

export default App
