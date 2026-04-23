import React, { useState, useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

import { getDoubleWins } from "./requests";

const INITIAL_CATEGORY = "Actress"

const CATEGORIES = {
  Actor: "Actor",
  Actress: "Actress",
  "Supporting Actor": "Supporting Actor",
  "Supporting Actress": "Supporting Actress",
};

const tabsContainerStyle = {
  color: "white",
  margin: "20px 0px 20px 0px",
  "& .MuiTabs-indicator": {
    display: "none", // This hides the indicator (underline)
  },
  "& .MuiTabs-flexContainer": {
    flexWrap: "wrap", // Enables wrapping
  },
};
const tabStyle = {
  color: "white",
  textTransform: 'none',
  fontSize: "24px",
};

export const DoubleWins = () => {
  const [category, setCategory] = useState("Actress");
  const [data, setData] = useState([]);

  const handleChange = async (event, newValue) => {
    setCategory(newValue);
    const responseData = await getDoubleWins(newValue);
    setData(responseData);
  };

  useEffect(() => {
    const wrapper = async () => {
      const responseData = await getDoubleWins(INITIAL_CATEGORY);
      setData(responseData);
    };
    wrapper()
  });

  return (
    <Box sx={{ width: "100%" }}>
      <div className={"app-container"}>
        <Tabs
          value={category}
          onChange={handleChange}
          centered
          sx={tabsContainerStyle}
        >
          <Tab label="Actor" value="Actor" sx={tabStyle} />
          <Tab label="Actress" value="Actress" sx={tabStyle} />
          <Tab
            label="Supporting Actor"
            value="Supporting Actor"
            sx={tabStyle}
          />
          <Tab
            label="Supporting Actress"
            value="Supporting Actress"
            sx={tabStyle}
          />
        </Tabs>

        <Box sx={{ mt: 2 }}>
          {data.map((datum) => {
            return (
              <div className={"double-win-list-row"}>{`${datum.year}: ${datum.name} - ${datum.detail}`}</div>
            );
          })}
        </Box>
      </div>
    </Box>
  );
};
