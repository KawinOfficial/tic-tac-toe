import "./App.scss";
import { Route, Routes, useLocation } from "react-router-dom";
import { Home, Game } from "./page";
import { ContentWarp } from "./components";

export default function App() {
  const location = useLocation();

  return (
    <>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<ContentWarp content={Home} />} />
        <Route path="/game" element={<ContentWarp content={Game} />} />
      </Routes>
    </>
  );
}
