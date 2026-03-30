import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Route, Routes } from "react-router";
import App from "./App.tsx";
import "./index.css";
import LandingPage from "./LandingPage.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />}></Route>
        <Route path="/overall" element={<App timeframe="overall" />}></Route>
        <Route path="/monthly" element={<App timeframe="monthly" />}></Route>
        <Route path="/weekly" element={<App timeframe="weekly" />}></Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>,
);
