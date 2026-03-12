import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import {
  getCategory,
  getNominees,
  getPerson,
  getCategories,
  getNomineesByYear,
} from "./requests";
import { Spinner } from "./Components/Spinner";
import { Choices } from "./Components/Choices";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "./customTheme";

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}


const getTransformedNominees = async () => {
  const nominees = await getNomineesByYear(2025);
  const categories = await getCategories();
  const transformedNominees = {};
  categories.forEach((category) => {
    transformedNominees[category.name] = [];
  });
  nominees.forEach((nominee) => {
    const person = nominee["person"]["name"];
    const category = nominee["category"]["name"];
    const transformedNominee = {
      name: person,
      isWinner: nominee.is_winner,
      detail: nominee.detail,
    };
    transformedNominees[category].push(transformedNominee);
  });
  console.log(transformedNominees);
  return transformedNominees;
};

function App() {
  const [transformedNominees, setTransformedNominees] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const transformed = await getTransformedNominees();
      setTransformedNominees(transformed);
    };
    fetchData();
  }, []);

  if (Object.keys(transformedNominees).length === 0) {
    return <Spinner />;
  }

  return (
   <ThemeProvider theme={theme}>
        {Object.keys(transformedNominees).map((category) => (
          <div key={category}>
            <Choices
              category={category}
              options={transformedNominees[category]}
            />
          </div>
        ))}
    </ThemeProvider>
  );
}

export default App;
