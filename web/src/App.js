import "./App.module.scss";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import MapComponent from "./pages/MapComponent/MapComponent";

function App() {
  return (
    <BrowserRouter>
      <main className="App">
        <Routes>
          <Route path="/" element={<HomePage />}></Route>
          <Route path="map" element={<MapComponent />}></Route>
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
