import React, { useState } from "react";
import "./App.css";
import Header from "./components/Header";
import Home from "./components/Home";
import { useMediaQuery } from "@mui/material";

function App() {
  const matches = useMediaQuery("(max-width:750px)");
  const [loading, setloading] = useState(true);

  return (
    <>
      <Header />
      <Home />
    </>
  );
}

export default App;
