import "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
