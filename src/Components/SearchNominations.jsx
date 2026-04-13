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

export const SearchNominations = () => {
  const [nominations, setNominations] = useState([]);
  const [input, setInput] = useState("");
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    const data = await getNominationsByName(input);
    if (data && data.length > 0) {
      setNominations(data);
    } else {
      setNominations([]);
    }
    setIsFirstLoad(false);
  };

  const NoNominationsElem = isFirstLoad ? (
    <p>Search for a nominee to see their nominations.</p>
  ) : (
    <p>No nominations found.</p>
  );

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
          <div>{nominations[0].name}</div>
          {nominations.map((nomination, idx) => (
            <div key={name + idx}>
              <h3>{nomination.category}</h3>
              <p>{nomination.detail}</p>
              <p>{nomination.year}</p>
              <p>{nomination.is_winner ? "Winner" : "Nominee"}</p>
            </div>
          ))}
        </>
      ) : (
        <div>{NoNominationsElem}</div>
      )}
    </div>
  );
};
