import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "../redux/selectionsSlice";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Choice } from "./Choice";
import { border, borderRadius } from "@mui/system";

const gray1 = "#1F262D";
const gray2 = "#232C34";
const gray3 = "#445566";
const darkGray = "#15181C";

const toggleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "10px",
};

const toggleStyle = {
  width: {
    xs: "100%",
    sm: "300px",
  },
  color: "white",
  backgroundColor: gray2,
  "&:hover": {
    border: `2px solid ${gray3}`, // Optional: add a border when selected
  },
  "&.Mui-selected": {
    backgroundColor: gray3, // Change to your desired color
    color: "white", // Text color when selected
    border: `2px solid ${gray3}`, // Optional: add a border when selected
  },
  "&.Mui-selected:hover": {
    backgroundColor: gray3, // Optional: hover color
    border: `2px solid ${gray3}`, // Optional: add a border when selected
  },
};

export const Choices = ({ category, options }) => {
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
    <div>
      <div className={"category-title"}>{category}</div>
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        style={toggleContainerStyle}
      >
        {options.map((option) => {
          const optionName = `${option.name}${option.detail ? ` for ${option.detail}` : ""}`;

          return (
            <ToggleButton value={optionName} sx={toggleStyle}>
              <Choice category={category} option={option} />
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};
