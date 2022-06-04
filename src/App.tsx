import { Routes, Route, BrowserRouter } from "react-router-dom";
import * as Pages from "./pages";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Pages.Home />} />
          <Route path="/favorite" element={<Pages.Favorite />} />
          <Route path="/album/:id" element={<Pages.Album />} />
          <Route path="/track/:id" element={<Pages.Track />} />
          <Route path="/artist/:id" element={<Pages.Artist />} />
          <Route path="*" element={<Pages.Home />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
