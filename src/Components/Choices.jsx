import React from "react";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";

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
          return <ToggleButton value={optionName}>{optionName}</ToggleButton>;
        })}
      </ToggleButtonGroup>
    </div>
  );
};
