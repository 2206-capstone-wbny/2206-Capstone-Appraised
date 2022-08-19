import React from "react";

import Navbar from "./components/Navbar";
import Routes from "./Routes";

import { API_KEY } from "../key.js";

const App = () => {
  console.log(API_KEY);
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  );
};

export default App;
