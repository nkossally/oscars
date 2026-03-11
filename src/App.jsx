import { useState, useEffect} from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import { getCategory, getNominees, getPerson, getCategories, getNomineesByYear } from './requests'
import { Spinner } from './Spinner'

const getTransformedNominees = async () => {
  // const nominees =  await getNominees();
  const nominees = await getNomineesByYear(2025);
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
      isWinner: nominee.is_winner,
      detail: nominee.detail
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

  if (Object.keys(transformedNominees).length === 0) {
    return <Spinner />
  }

  return (
    <>
      <button onClick={getTransformedNominees}>
        {Object.keys(transformedNominees).map((category) => (
          <div key={category}>
            <h2>{category}</h2>
            <ul>
              {transformedNominees[category].map((nominee) => (
                <div key={nominee.name}>
                  <li key={nominee.name}>
                    {nominee.name} {nominee.isWinner ? "(Winner)" : ""}
                  </li>
                  {nominee.detail && <p>for&nbsp;{nominee.detail}</p>}
                </div>
              ))}
            </ul>
          </div>
        ))}
      </button>
    </>
  );
}

export default App
