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
  const [nameLabel, setNameLabel] = useState("")

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    setIsLoading(true);
    const data = await getNominationsByName(input);
    if (data && data.length > 0) {
      setNominations(data);

      setNominationsCount(data.length);
      const nameCounter = {};
      let highCount = 0;
      let bestName = ""
      data.forEach((nomination) => {
        name = nomination["name"];
        if (nameCounter[name] == undefined) {
          nameCounter[name] = 0;
        }
        nameCounter[name] += 1;
        if (nameCounter[name] > highCount) {
          highCount = nameCounter[name];
          bestName = name;
        }
      });
      const wins = data.filter((nomination) => nomination.is_winner).length;
      setWinCount(wins);
      setNameLabel(bestName)
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
      <button
        disabled={!input.trim()}
        onClick={handleSearch}
        type="submit"
        className={"nominations-button"}
      >
        Search
      </button>
      {nominations.length > 0 ? (
        <>
          <div className="nominee-name">{nameLabel}</div>
          <div className={"counts-container"}>
            <div className={"counts-inner-container"}>
              <div>{`${nominationsCount} nomination${nominationsCount !== 1 ? "s" : ""}`}</div>
              &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<div> {`${winCount} win${winCount !== 1 ? "s" : ""}`}</div>
            </div>

            <div> * win count includes noncompetitve honorary oscars</div>
          </div>
          {nominations.map((nomination, idx) => (
            <NominationCard
              key={nomination.category + nomination.year + idx}
              category={nomination.category}
              detail={nomination.detail}
              year={nomination.year}
              isWinner={nomination.is_winner}
              note={nomination.note}
              name={nomination.name}
            />
          ))}
        </>
      ) : (
        <div className="no-nominations">{NoNominationsElem}</div>
      )}
    </form>
  );
};
