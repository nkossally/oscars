import { useState, useEffect } from "react";
import {
  getNominationsByName,
} from "../requests";
import { Spinner } from "./Spinner";
import { NominationCard } from "./NominationCard";

export const SearchNominations = () => {
  const [nominations, setNominations] = useState([]);
  const [input, setInput] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [nominationsCount, setNominationsCount] = useState(0);
  const [winCount, setWinCount] = useState(0);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const data = await getNominationsByName(input);
    if (data && data.length > 0) {
      setNominations(data);

      setNominationsCount(data.length);
      const wins = data.filter((nomination) => nomination.is_winner).length;
      setWinCount(wins);
    } else {
      setNominations([]);
      setNominationsCount(0);
      setWinCount(0);
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
    <form className="search-nominations-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type name of nominee..."
        className="nominations-search-input"
      />
      <button disabled={!input.trim()} onClick={handleSearch} type="submit" className={"nominations-button"}>
        Search
      </button>
      {nominations.length > 0 ? (
        <>
          <div className="nominee-name">{nominations[0].name}</div>
          <div className={"counts-container"}>
            <div >{`${nominationsCount} nomination${nominationsCount !== 1 ? 's' : ''}`}</div>
            <div > {`${winCount} win${winCount !== 1 ? 's' : ''}` }</div>
          </div>
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
        <div className="no-nominations">{NoNominationsElem}</div>
      )}
    </form>
  );
};
