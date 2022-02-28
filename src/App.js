import { Routes, Route, BrowserRouter } from "react-router-dom";
import Favorite from "./pages/Favoris";
import Home from "./pages/Home";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
