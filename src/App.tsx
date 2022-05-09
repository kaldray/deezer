import { Routes, Route, BrowserRouter } from "react-router-dom";
import Album from "./pages/Album/Album";
import Artist from "./pages/Artist/Artist";
import Favorite from "./pages/Favori/Favoris";
import Home from "./pages/Home/Home";
import Track from "./pages/Track/Track";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/favorite" element={<Favorite />} />
          <Route path="/album/:id" element={<Album />} />
          <Route path="/track/:id" element={<Track />} />
          <Route path="/artist/:id" element={<Artist />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
