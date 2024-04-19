import "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import HomePage from "./pages/HomePage/HomePage";
import DataContext from "./context";
import { useState } from "react";

function App() {
  const [UserData, setUserData] = useState({});
  return (
    <DataContext.Provider
    value={{
        setUserData,
        UserData
      }
    }
    >
      <BrowserRouter>
        <main className="App">
          <Routes>
            <Route path="/" element={<Auth />}></Route>
            <Route path="/HomePage" element={<HomePage />}></Route>
          </Routes>
        </main>
      </BrowserRouter>
    </DataContext.Provider>
  );
}

export default App;
