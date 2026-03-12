import React, { useState } from "react";
import { createTheme, ThemeProvider } from '@mui/material/styles';
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { Choice } from "./Choice";


const toggleContainerStyle = {
  display: "flex",
  flexDirection: "row",
  flexWrap: "wrap",
  gap: "10px",
  // justifyContent: "center",
};

const blarg = {
  width: {
    xs: "100%",
    sm: "50%",
  },
};

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
      <ToggleButtonGroup
        value={value}
        exclusive
        onChange={handleChange}
        style={toggleContainerStyle}
      >
        {options.map((option) => {
          const optionName = `${option.name}${option.detail ? ` for ${option.detail}` : ""}`;

          return (
            <ToggleButton
              value={optionName}
              sx={blarg}
            >
              <Choice category={category} option={option} />
            </ToggleButton>
          );
        })}
      </ToggleButtonGroup>
    </div>
  );
};
