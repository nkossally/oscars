import React, { useState } from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Choice } from "./Choice";

const toggleStyle = {};

// const toggleStyle = {
//   color: "white",
//   backgroundColor: "#333",
//   "&.Mui-selected": {
//     backgroundColor: "#1976d2",
//     color: "white"
//   }
// }

export const Choices = ({ category, options }) => {
  const [value, setValue] = React.useState("one");

  const handleChange = (event, newValue) => {
    if (newValue !== null) {
      setValue(newValue);
    }
  };

  return (
    <div>
      <div>{category}</div>
      <ToggleButtonGroup value={value} exclusive onChange={handleChange}>
        {options.map((option) => {
          const optionName = `${option.name}${option.detail ? ` for ${option.detail}` : ""}`;

          return (
            <ToggleButton value={optionName}>
              <Choice category={category} option={option} />
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};
