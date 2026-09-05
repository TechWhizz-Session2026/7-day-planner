import {useState} from 'react'
import  logo from "../assets/logo.png"
import avatar from "../assets/avatar.png"
import magnifier from "../assets/magnifier.png"
import notification from "../assets/notification.png"
import "./Navbar.css";

const Navbar = () => {
    const [showNotifications, setShowNotifications] = useState(false);
    const [showSearch, setShowSearch] = useState(false);
    const [search, setSearch] = useState("");
  return (
    <div>
      <div className="navbar">
        <img src={logo} alt="Logo" />
        <section className="btns">
            <button onClick={() => setShowSearch(!showSearch)}><img src={magnifier} alt="Magnifier" /></button>
            {showSearch && (
               <div className="search-box">
                  <input type="text" placeholder="Search plans..." value={search} onChange={(e) => setSearch(e.target.value)}/>
               </div>
          )}
            <button  onClick={() => setShowNotifications(!showNotifications)}><img src={notification} alt="Notification" /></button>
            {showNotifications && (
              <div className="notification-dropdown">
                <h3>Notifications</h3>
                <p>No new notifications</p>
              </div>
        )}
            <div className="user">
               <button className='user-name'>Oluwaseun</button> 
              <img src={avatar} alt="Avatar" />
            </div>
        </section>
      </div>
      <div className="sidebar">
        <ul>
          
        </ul>
      </div>
      
    </div>
  )
}

export default Navbar