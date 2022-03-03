import { Routes, Route, BrowserRouter } from "react-router-dom";
import Album from "./pages/Album";
import Artist from "./pages/Artist";
import Favorite from "./pages/Favoris";
import Home from "./pages/Home";
import Track from "./pages/Track";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/favorite" element={<Favorite />}></Route>
          <Route path="/album/:id" element={<Album />}></Route>
          <Route path="/track/:id" element={<Track />}></Route>
          <Route path="/artist/:id" element={<Artist />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
