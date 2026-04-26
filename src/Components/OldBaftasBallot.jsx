import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import { getCategories, getNomineesByYear, getBaftaCategories, getBaftaNomineesByYear } from "../requests";
import { Spinner } from "./Spinner";
import { Choices } from "./Choices";
import { OldChoices } from "./OldChoices";
import { DownshfitAutocomplete } from "./DownshfitAutocomplete";
import { compileString } from "sass";

const INITIAL_YEAR = 2025

const years = [
  1948,
  1949,
  1950,
  1951,
  1952,
  1953,
  1954,
  1955,
  1956,
  1957,
  1958,
  1959,
  1960,
  1961,
  1962,
  1963,
  1964,
  1965,
  1966,
  1967,
  1968,
  1969,
  1970,
  1971,
  1972,
  1973,
  1974,
  1975,
  1976,
  1977,
  1978,
  1979,
  1980,
  1981,
  1982,
  1983,
  1984,
  1985,
  1986,
  1987,
  1988,
  1989,
  1990,
  1991,
  1992,
  1993,
  1994,
  1995,
  1996,
  1997,
  1998,
  1999,
  2000,
  2001,
  2002,
  2003,
  2004,
  2005,
  2006,
  2007,
  2008,
  2009,
  2010,
  2011,
  2012,
  2013,
  2014,
  2015,
  2016,
  2017,
  2018,
  2019,
  2020,
  2021,
  2022,
  2023,
  2024,
  2025,
];

export const OldBaftasBallot = () => {
  const [transformedNominees, setTransformedNominees] = useState({});
  const [winners, setWinners] = useState({});
  const [score, setScore] = useState(0);
  const selections = useSelector((state) => state.selections);
  const [year, setYear] = useState(INITIAL_YEAR);
  const [isLoading, setIsLoading] = useState(false)
  const dispatch = useDispatch();

  const getTransformedNominees = async () => {
    const nominees = await getBaftaNomineesByYear(year);
    const categories = await getBaftaCategories();

    const transformedNominees = {};
    const newWinners = {};
    categories.forEach((category) => {
      transformedNominees[category.name] = [];
      newWinners[category.name] = [];
    });
    if (!selections || Object.keys(selections).length === 0) {
      const newSelections = {};
      categories.forEach((category) => {
        newSelections[category.name] = null;
      });
      dispatch(update(newSelections));
    }
    nominees.forEach((nominee) => {
      const person = nominee["person"];
      const person_name = person ? person["name"] : "Unknown";
      const category = nominee["category_bafta"]["name"];
      const transformedNominee = {
        name: person_name,
        isWinner: nominee.is_winner,
        detail: nominee.detail,
      };
      if (nominee.is_winner) {
        newWinners[category].push(transformedNominee);
      }

      transformedNominees[category].push(transformedNominee);
    });
    setWinners(newWinners);
    return transformedNominees;
  };

  const fetchData = async () => {
    setIsLoading(true);
    const transformed = await getTransformedNominees();
    setTransformedNominees(transformed);
    setIsLoading(false);
  }; 

  useEffect(() => {
    fetchData();
  }, [year]);

  useEffect(() => {}, [year]);

  if (isLoading) {
    return <Spinner />;
  }


  return (
    <div className="old-ballot-container">
      <div className={"old-ballot-inner-container"}>
        <DownshfitAutocomplete handleSelect={setYear} years={years} />
        {process.env.NODE_ENV === "development" &&<button onClick={fetchData}>Refresh</button>}
        <div className={"ballot-year"}>{year}</div>
        {Object.keys(transformedNominees).map(
          (category) =>
            transformedNominees[category].length > 0 && (
              <div key={category}>
                <OldChoices
                  category={category}
                  options={transformedNominees[category]}
                />
              </div>
            ),
        )}
      </div>
    </div>
  );
};
