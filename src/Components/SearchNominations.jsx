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
  const [name, setName] = useState("");
  const [input, setInput] = useState("");

  const handleInputChange = (event) => {
    setInput(event.target.value);
  };

  const handleSearch = async () => {
    const data = await getNominationsByName(input);
    if (data && data.length > 0){
      setName(data[0]["person"]["name"]);
      setNominations(data);
    }
  };

  useEffect(() => {
    getNominationsByName("Brad Pitt");
  }, []);

  return (
    <div className="ballot-container">
      <input
        type="text"
        value={input}
        onChange={handleInputChange}
        placeholder="Type name of nominee..."
      />
      <button onClick={handleSearch}>Search</button>
      {nominations.length > 0 ? (
        nominations.map((nomination, idx) => (
          <div key={name + idx} >
            <h3>{nomination.category.name}</h3>
            <p>{nomination.detail}</p>
            <p>{nomination.year}</p>
            <p>{nomination.is_winner ? "Winner" : "Nominee"}</p>
          </div>
        ))
      ) : (
        <p>No nominations found.</p>
      )}
    </div>
  );
};
