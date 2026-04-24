import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import classNames from 'classnames';

const gray1 = "#1F262D";
const gray2 = "#232C34";
const gray3 = "#445566";
const darkGray = "#15181C";

export const OldChoices = ({ category, options }) => {
  const selections = useSelector((state) => state.selections);
  const [value, setValue] = useState(selections[category]);
  const dispatch = useDispatch();

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
      dispatch(update({ ...selections, [category]: newValue }));
    }
  };

  const forScript = <span className="script-text">for</span>

  return (
    <div className={"old-choice"}>
      <div className={"category-title"}>{category}</div>
      <div >
        {options.map((option) => {
          let optionName 
          if ((option.name && option.detail && option.name === option.detail) || (option.name == "Unknown")) {
            optionName = <span>{option.detail}</span> 
          } else if(option.detail){
            optionName = <span>{option.name}<span className={"script-text"}> for </span>{option.detail}</span>
          }else {
            optionName = <span>{option.name}</span>
          }  
          return (
            <div className={classNames("single-choice", option.isWinner && "old-choice-winner")} key={optionName}>
              {optionName}
            </div>
          );
        })}
      </div>
    </div>
  );
};
