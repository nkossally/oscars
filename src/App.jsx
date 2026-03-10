import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { get_nominees } from './requests'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <button onClick={get_nominees} >
        hello world
        </button>
    </>
  )
}

export default App
