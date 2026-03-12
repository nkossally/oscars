import { useState, useEffect } from "react";
import {
  getCategories,
  getNomineesByYear,
} from "./requests";
import { Spinner } from "./Components/Spinner";
import { Choices } from "./Components/Choices";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { theme } from "./customTheme";

function App() {
  const [transformedNominees, setTransformedNominees] = useState({});
  const [winners, setWinners] = useState({});
  const [selections, setSelections] = useState({});
  const [score, setScore] = useState(0);

  const getTransformedNominees = async () => {
    const nominees = await getNomineesByYear(2025);
    const categories = await getCategories();
    const transformedNominees = {};
    const newWinners = {};
    categories.forEach((category) => {
      transformedNominees[category.name] = [];
      newWinners[category.name] = null;
    });
    if(Object.keys(selections).length === 0) {
      const newSelections = {};
      categories.forEach((category) => {
        selections[category.name] = null;
      });
      setSelections(newSelections);
    }
    nominees.forEach((nominee) => {
      const person = nominee["person"]["name"];
      const category = nominee["category"]["name"];
      const transformedNominee = {
        name: person,
        isWinner: nominee.is_winner,
        detail: nominee.detail,
      };
      if (nominee.is_winner) {
        newWinners[category] = person;
      }

      transformedNominees[category].push(transformedNominee);
    });
    setWinners(newWinners);
    return transformedNominees;
  };

  const getScore = () => {
    let newScore = 0;
    Object.keys(selections).forEach((category) => {
      if (selections[category] && selections[category].includes(winners[category])) {
        newScore += 1;
      }
    });
    setScore(newScore);
  }

  useEffect(() => {
    getScore();
  }, [selections, winners]);

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
      Score: {score}
      {Object.keys(transformedNominees).map((category) => (
        <div key={category}>
          <Choices
            category={category}
            options={transformedNominees[category]}
            selections={selections}
            setSelections={setSelections}
          />
        </div>
      ))}
    </ThemeProvider>
  );
}

export default App;
