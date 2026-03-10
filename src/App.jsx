import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCategory, getNominees, getPerson } from './requests'

const blarg = async () => {
  const category =  await getCategory(1);

  const person =  await getPerson(1);

  console.log("category", category);
  console.log("person", person);
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
