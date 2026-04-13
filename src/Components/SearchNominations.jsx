import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import {
  getCategories,
  getNomineesByYear,
  getNominationsByName,
} from "../requests";
import { Spinner } from "./Spinner";
import { Choices } from "./Choices";
import { NominationCard } from "./NominationCard";

export const SearchNominations = () => {
  const [nominations, setNominations] = useState([]);
  const [input, setInput] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const data = await getNominationsByName(input);
    if (data && data.length > 0) {
      setNominations(data);
    } else {
      setNominations([]);
    }
    setIsLoading(false);
    setIsFirstLoad(false);
  };

  const NoNominationsElem = isFirstLoad ? (
    <p>Search for a nominee to see their nominations.</p>
  ) : (
    <p>No nominations found.</p>
  );

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <div className="search-nominations-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type name of nominee..."
        className="nominations-search"
      />
      <button onClick={handleSearch} className={"nominations-button"}>
        Search
      </button>
      {nominations.length > 0 ? (
        <>
          <div className="nominee-name">{nominations[0].name}</div>
          {nominations.map((nomination, idx) => (
            <NominationCard
              key={nomination.category + nomination.year + idx}
              category={nomination.category}
              detail={nomination.detail}
              year={nomination.year}
              isWinner={nomination.is_winner}
            />    
  
          ))}
        </>
      ) : (
        <div>{NoNominationsElem}</div>
      )}
    </div>
  );
};
