import React from 'react'
import { NavLink } from 'react-router-dom'
import "./Sidebar.css";
import home from "../assets/home.png"
import plus from "../assets/plus.png"
import schedule from "../assets/schedule.png"
import user from "../assets/user.png"

const Sidebar = () => {
  return (
    <div className="sidebar">
      <ul>
        <NavLink to="/">
           <li><img src={home} alt="Home" />Home</li>
        </NavLink>
        <NavLink to="/new-plans">
            <li><img src={plus} alt="New Plans" />New Plan</li>
        </NavLink>
        <NavLink to="/home">
           <li><img src={schedule} alt="Plans Home" />Plans</li>
        </NavLink>
        
        <NavLink to="/profile">
            <li><img src={user} alt="Profile" />Profile</li>
        </NavLink>
      </ul>
    </div>
  )
}

export default Sidebar