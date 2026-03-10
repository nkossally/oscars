import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCategory, getNominees, getPerson } from './requests'

const getTransformedNominees = async () => {
  const nominees =  await getNominees();
  const transformedNominees = []

  const promises = nominees.map( async (nominee) => {
    const categoryResp = await getCategory(nominee.category_id);
    const category = categoryResp.name
    const personResp = await getPerson(nominee.person_id);
    const person = personResp.name
    const transformedNominee = {
      name: person,
      category: category,
      isWinner: nominee.is_winner
    }
    transformedNominees.push(transformedNominee);
  })
  await Promise.all(promises);
  
  console.log("transformedNominees", transformedNominees);
}

function App() {

  return (
    <>
      <button onClick={getTransformedNominees} >
        hello world
        </button>
    </>
  )
}

export default App
