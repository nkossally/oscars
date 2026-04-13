import React, { useState, useEffect } from "react";
import { getCategories, getNomineesByYear } from "./requests";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { Spinner } from "./Components/Spinner";
import { Choices } from "./Components/Choices";
import { Ballot } from "./Components/Ballot";
import { OldBallot } from "./Components/OldBallot";
import { SearchNominations } from "./Components/SearchNominations";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./customTheme";

function App() {
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const customTheme = {
    colors: { primary: "#007bff", background: "#ffffff" },
    // ... more theme properties
  };

  const tabsContainerStyle = {
    color: "white",
    margin: "20px 0px 20px 0px",
    "& .MuiTabs-indicator": {
      display: "none", // This hides the indicator (underline)
    },
  };

  const tabStyle = {
    color: "white",
  };

  return (
    <ThemeProvider theme={createTheme(theme)}>
      <Box sx={{ width: "100%" }}>
        <div className={"app-container"}>
          <Tabs
            value={value}
            onChange={handleChange}
            centered
            sx={tabsContainerStyle}
          >
            <Tab label="Current Ballot" sx={tabStyle} />
            <Tab label="Previous Nominees" sx={tabStyle} />
            <Tab label="Search Nominations" sx={tabStyle} />
          </Tabs>

          <Box sx={{ mt: 2 }}>
            {value === 0 && <Ballot />}
            {value === 1 && <OldBallot />}
            {value === 2 && <SearchNominations />}
          </Box>
        </div>
      </Box>
    </ThemeProvider>
  );
}

export default App;
