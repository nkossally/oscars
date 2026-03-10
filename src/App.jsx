import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { get_nominees, get_category } from './requests'

const blarg = async () => {
  const category =  await get_category(1);


  console.log("category", category);
  // console.log("nominees", nominees);
}

function App() {

  return (
    <>
      <button onClick={blarg} >
        hello world
        </button>
    </>
  )
}

export default App
