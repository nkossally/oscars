import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { getCategory, getNominees, getPerson, getCategories } from './requests'

const getTransformedNominees = async () => {
  const nominees =  await getNominees();
  const categories = await getCategories();
  const transformedNominees = {}
  categories.forEach((category) => {
    transformedNominees[category.name] = [];
  })

  const promises = nominees.map( async (nominee) => {
    const categoryResp = await getCategory(nominee.category_id);
    const category = categoryResp.name
    const personResp = await getPerson(nominee.person_id);
    const person = personResp.name
    const transformedNominee = {
      name: person,
      isWinner: nominee.is_winner
    }
    transformedNominees[category].push(transformedNominee);
  })
  await Promise.all(promises);

  return transformedNominees;
  
  console.log("transformedNominees", transformedNominees);
}

function App() {
  const [transformedNominees, setTransformedNominees] = useState({})

  useEffect(() => {
    const fetchData = async () => {
      const transformed = await getTransformedNominees();
      setTransformedNominees(transformed);
    };
    fetchData();
  }, []);


  return (
    <>
      <button onClick={getTransformedNominees} >
        {Object.keys(transformedNominees).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <ul>
              {transformedNominees[category].map((nominee) => (
                <li key={nominee.name}>
                  {nominee.name} {nominee.isWinner ? "(Winner)" : ""}
                </li>
              ))}
            </ul>
          </div>
        ))}
        </button>
    </>
  )
}

export default App
