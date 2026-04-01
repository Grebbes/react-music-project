import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";

import LandingPage from "./LandingPage.tsx";
import MusicPlayerScreen from "./music-player-screen.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path=":timeframe" element={<App />}></Route>
        <Route
          path=":timeframe/musicplayer/:songid"
          element={<MusicPlayerScreen />}
        ></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
