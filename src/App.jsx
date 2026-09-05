import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./Home";
import Dashboard from "./Dashboard";
import PlansHome from "./PlansHome";
import NewPlans from "./NewPlans";
import Navbar from "./Components/Navbar";
import Sidebar from "./Components/Sidebar";
import "./App.css";
import WeekPlan from "./Components/WeekPlan";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/dashboard"
          element={
            <div className="dashboard-layout">
              <Sidebar />

              <main className="dashboard-content">
                <Dashboard />
              </main>
            </div>
          }
        >
          <Route path="home" element={<PlansHome />} />
          <Route path="new-plans" element={<NewPlans />} />
          <Route path="week-plan" element={<WeekPlan />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;