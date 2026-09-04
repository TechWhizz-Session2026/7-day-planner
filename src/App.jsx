import { useState } from "react";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Navbar from "./Components/Navbar";
import Home from "./Home";
import Dashboard from "./Dashboard";
import PlansHome from "./PlansHome";
import NewPlans from "./NewPlans";
import Sidebar from "./Components/Sidebar";


function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Navbar/>
      <BrowserRouter>
        <Sidebar/>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<Dashboard />}/>
          <Route path="/dashboard/home" element={<PlansHome />} />
          <Route path="/dashboard/new-plans" element={<NewPlans />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
