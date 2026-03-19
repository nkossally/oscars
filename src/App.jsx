import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./redux/selectionsSlice";
import { getCategories, getNomineesByYear } from "./requests";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Spinner } from "./Components/Spinner";
import { Choices } from "./Components/Choices";
import { Ballot } from "./Components/Ballot";
import { OldBallot } from "./Components/OldBallot";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./customTheme";

function App() {
    const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Tabs value={value} onChange={handleChange}>
        <Tab label="Tab 1" />
        <Tab label="Tab 2" />
      </Tabs>

      <Box sx={{ mt: 2 }}>
        {value === 0 && <Ballot />}
        {value === 1 && <OldBallot />}
      </Box>
    </Box>
  );
}

export default App;
