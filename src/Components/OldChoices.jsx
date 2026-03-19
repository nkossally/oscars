import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Choice } from "./Choice";
import { border, borderRadius, minHeight } from "@mui/system";

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

  return (
    <div className={"old-choice"}>
      <div className={"category-title"}>{category}</div>
      <div>
        {options.map((option) => {
          const optionName = `${option.name}${option.detail ? ` for ${option.detail}` : ""}`;

          return (
            <div>
                    {optionName}
              {option.isWinner && <div className={"winner-label"}>Winner</div>}
            </div>
          );
        })}
      </div>
    </div>
  );
};
