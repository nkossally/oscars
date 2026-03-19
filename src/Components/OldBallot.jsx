import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import { getCategories, getNomineesByYear } from "../requests";
import { Spinner } from "./Spinner";
import { Choices } from "./Choices";
import { OldChoices } from "./OldChoices";
import { DownshfitAutocomplete } from "./DownshfitAutocomplete";

export const OldBallot = () => {
  const [transformedNominees, setTransformedNominees] = useState({});
  const [winners, setWinners] = useState({});
  const [score, setScore] = useState(0);
  const selections = useSelector((state) => state.selections);
  const [year, setYear] = useState(2024);
  const dispatch = useDispatch();

  const getTransformedNominees = async () => {
    const nominees = await getNomineesByYear(year);
    const categories = await getCategories();
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
      const person = nominee["person"]["name"];
      const category = nominee["category"]["name"];
      const transformedNominee = {
        name: person,
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

  useEffect(() => {
    const fetchData = async () => {
      const transformed = await getTransformedNominees();
      setTransformedNominees(transformed);
    };
    fetchData();
  }, [year]);

  useEffect(() => {}, [year]);

  if (Object.keys(transformedNominees).length === 0) {
    return <Spinner />;
  }
  console.log(year);

  return (
    <div className="old-ballot-container">
      <DownshfitAutocomplete handleSelect={setYear} />
      <div className={"old-ballot-inner-container"}>
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
