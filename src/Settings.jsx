import { useState } from "react";
import "./Settings.css";

const Settings = () => {
  const [notifications, setNotifications] = useState({
    dueDate: true,
    weeklySummary: true,
    announcements: false,
  });
  const [theme, setTheme] = useState("light");

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

  return (
    <div className="the-settings">
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
            <button className="outline-action" type="button">Change Password</button>
            <button className="outline-action" type="button">Export My Data</button>
          </section>

          <section className="settings-card danger-card">
            <h2>Danger Zone</h2>
            <p>This cannot be undone.</p>
            <button className="danger-action" type="button">Clear All Plans</button>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Settings;
