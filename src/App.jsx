import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import PlansHome from "./PlansHome";
import NewPlans from "./NewPlans";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}>
            <Route path="home" element={<PlansHome />} />
            <Route path="new-plans" element={<NewPlans />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
