import React, { useState } from "react";
import { ThemeProvider } from "@mui/material/styles";
import Container from "@mui/material/Container";

import MainAppBar from "./modules/layout/modules/MainAppBar/MainAppBar";
import "./App.css";
import { lightTheme } from "./themes";

function App() {
  const [theme] = useState(lightTheme);

  return (
    <div className="App">
      <ThemeProvider theme={theme}>
        <Container>
          <MainAppBar />
        </Container>
      </ThemeProvider>
    </div>
  );
}

export default App;
