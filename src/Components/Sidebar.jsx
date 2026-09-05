import { NavLink, useNavigate } from "react-router-dom";
import { useState } from "react";
import "./Sidebar.css";
import home from "../assets/home.png";
import home1 from "../assets/home1.png";
import plus from "../assets/plus.png";
import schedule from "../assets/schedule.png";
import user from "../assets/user.png";
import LogoutModal from "./LogoutModal";

const Sidebar = () => {
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const navigate = useNavigate();
  const handleLogout = () => {
    setShowLogoutModal(false);
    navigate("/dashboard");
  };
  return (
    <>
      <div className="sidebar">
        <ul>
          <NavLink to="/">
            <li>
              <img src={home} alt="Home" />
              Home
            </li>
          </NavLink>

          <NavLink to="/new-plans">
            <li>
              <img src={plus} alt="New Plans" />
              New Plan
            </li>
          </NavLink>

          <NavLink to="/home">
            <li>
              <img src={schedule} alt="Plans Home" />
              Plans
            </li>
          </NavLink>

          <NavLink to="/profile">
            <li>
              <img src={user} alt="Profile" />
              Profile
            </li>
          </NavLink>
        </ul>

        <button
          id="logoutBtn"
          onClick={() => setShowLogoutModal(true)}
        >
          <img src={home1} alt="Log out" />
          Log Out
        </button>
      </div>

      {showLogoutModal && (
        <LogoutModal
          onCancel={() => setShowLogoutModal(false)}
          onLogout={handleLogout}
        />
)}
    </>
  );
};

export default Sidebar;
