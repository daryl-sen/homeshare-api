import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";
import { BrowserRouter } from "react-router-dom";

import MainAppBar from "./modules/layout/modules/MainAppBar/MainAppBar";
import "./App.css";
import { lightTheme } from "./themes";
import Router from "./Router";

function App() {
  const [theme] = useState(lightTheme);

  return (
    <div className="App">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <Container>
            <MainAppBar />
            <Router />
          </Container>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
