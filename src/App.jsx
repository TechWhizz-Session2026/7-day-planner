import { useState } from "react";
import heroImg from "./assets/hero.png";
import reactLogo from "./assets/react.svg";
import viteLogo from "./assets/vite.svg";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Settings from "./Settings";
import Sidebar from "./Dummy/Sidebar";
import Navbar from "./Dummy/Navbar";

function App() {

  return (
    <>
      <Navbar />
      <BrowserRouter>
      <div className="appshell">
        <Sidebar />
        <div className="da-flex">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
        </div>
       
      </div>    
      </BrowserRouter>

    </>
  );
}

export default App;
