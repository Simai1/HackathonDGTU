import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./assets/pages/HomePage/HomePage";

function App() {

  return (
   
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<HomePage />}></Route>
          </Routes>
      </BrowserRouter>
  );
}

export default App;
