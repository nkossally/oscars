import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { update } from "./redux/selectionsSlice";
import { getCategories, getNomineesByYear } from "./requests";
import { Spinner } from "./Components/Spinner";
import { Choices } from "./Components/Choices";
import { Ballot } from "./Components/Ballot";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { theme } from "./customTheme";

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Ballot />
    </ThemeProvider>
  );
}

export default App;
