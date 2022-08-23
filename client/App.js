import React from "react";
import SearchBar from "./components/SearchBar";
import Navbar from "./components/Navbar";
import Routes from "./Routes";

import { API_KEY } from "../key.js";

const App = () => {
  // console.log(API_KEY);
  return (
    <div>
      <Navbar />
      <SearchBar />
      <Routes />
    </div>
  );
};

export default App;
