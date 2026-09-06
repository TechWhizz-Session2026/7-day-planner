import { useState, useEffect } from "react";
import DangerConfirm from "./components/DangerConfirm"
import ChangePass from "./components/ChangePass"
import ExportData from "./components/ExportData";
import "./Settings.css";

const Settings = () => {
   let notifs = "notificationschange";
   const [showDanger, setShowDanger] = useState(false);
   const [changePassy, setChangePass] = useState(false);
   const [exportData, setExportData] = useState(false);
   const [accountDeleted, setAccountDeleted] = useState(false);

   function exportDataTrue() {
    setExportData(true);
   }

  function changePassword() {
    setChangePass(true)
  }


  function ShowDangerTrue() {
    setShowDanger(true);
  }

  const [notifications, setNotifications] = useState(() => {
    let notifCheck = localStorage.getItem("notificationschange");

    if(notifCheck == null) {
    return{dueDate: true, weeklySummary: true, announcements: false};
    }else{
      return JSON.parse(notifCheck);
    }
  });


  const [theme, setTheme] = useState(() => {
    let themeCheck = localStorage.getItem("themeschange");

    if(themeCheck == null) {
      return "light";
    }else{
      return JSON.parse(themeCheck);
    }
  });

  

  const toggleNotification = (name) => {
    setNotifications((current) => ({
      ...current,
      [name]: !current[name],
    }));
  };

  const notificationOptions = [
    {
      key: "dueDate",
      title: "Due-date reminders",
      description: "Get notified the day a plan is due",
    },
    {
      key: "weeklySummary",
      title: "Weekly summary email",
      description: "A recap of your week every Sunday",
    },
    {
      key: "announcements",
      title: "New feature announcements",
      description: "Occasional product updates",
    },
  ];
 
  useEffect(() => {
    let newNotif = JSON.stringify(notifications);
    localStorage.setItem(notifs, newNotif)
  },[notifications])


  let themes = "themeschange";
  useEffect(() =>{
    let newTheme = JSON.stringify(theme);
    localStorage.setItem(themes, newTheme);
  },[theme] )




  return (
    <div className="the-settings">
      {accountDeleted ? (
        <div>
          <h1>your account has been deleted</h1>
        </div>
      ) :(
      <>
      <div className="settings-nav">
        <h1 className="nav-header">Settings</h1>
        <p className="nav-para">Manage notifications, appearance and your account</p>
      </div>

      <div className="settings-content">
        <div className="settings-column">
          <section className="settings-card notifications-card">
            <h2>Notifications</h2>
            <div className="notification-list">
              {notificationOptions.map((option) => (
                <div className="notification-row" key={option.key}>
                  <div>
                    <h3>{option.title}</h3>
                    <p>{option.description}</p>
                  </div>
                  <button
                    className={`toggle ${notifications[option.key] ? "is-on" : ""}`}
                    type="button"
                    aria-label={`Toggle ${option.title}`}
                    aria-pressed={notifications[option.key]}
                    onClick={() => toggleNotification(option.key)}
                  >
                    <span />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <section className="settings-card appearance-card">
            <h2>Appearance</h2>
            <div className="theme-options">
              <button
                className={`theme-option ${theme === "light" ? "is-selected" : ""}`}
                type="button"
                aria-pressed={theme === "light"}
                onClick={() => setTheme("light")}
              >
                <span className="theme-preview light-preview" />
                <span>Light {theme === "light" ? "✓" : ""}</span>
              </button>
              <button
                className={`theme-option ${theme === "dark" ? "is-selected" : ""}`}
                type="button"
                aria-pressed={theme === "dark"}
                onClick={() => setTheme("dark")}
              >
                <span className="theme-preview dark-preview" />
                <span>Dark</span>
              </button>
            </div>
          </section>
        </div>

        <div className="settings-column">
          <section className="settings-card account-card">
            <h2>Account</h2>
            <button onClick = {changePassword} className="outline-action" type="button">Change Password</button>
            <button onClick = {exportDataTrue} className="outline-action" type="button">Export My Data</button>
          </section>

          <section className="settings-card danger-card">
            <h2>Danger Zone</h2>
            <p>This cannot be undone.</p>
            <button onClick = {ShowDangerTrue} className="danger-action" type="button">Clear All Plans</button>
          </section>
        </div>
      </div>
      {showDanger && <DangerConfirm onCancel={ () => setShowDanger(false)} onConfirm={ () => setAccountDeleted(true)}/> }
      {changePassy && < ChangePass onClose={() => setChangePass(false)} />}
      {exportData && <ExportData onClose={() => {setExportData(false)}} onYes={() => {console.log("hi wsp broski"), setExportData(false)}}/>}
          </> 
           )}
    </div>
            
  ) 
};

export default Settings;
