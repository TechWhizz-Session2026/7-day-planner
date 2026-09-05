// Profile.jsx
import { useState, useEffect, useRef } from "react";
import "./Profile.css";

const PROFILE_KEY = "7dp_profile";

const DEFAULT_PROFILE = {
  fullName: "",
  email: "",
  phone: "",
  role: "",
  bio: "",
  photo: null,
  memberSince: null,
};

let getPlanStats;
try {
  getPlanStats = require("./planStats").getPlanStats;
} catch (e) {
  getPlanStats = () => ({ plansCreated: 0, completionRate: 0 });
}

function loadProfile() {
  try {
    const raw = localStorage.getItem(PROFILE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.fullName || parsed.email) {
        return parsed;
      }
    }
  } catch (err) {
    // fall through to fresh profile
  }
  const fresh = { ...DEFAULT_PROFILE, memberSince: new Date().toISOString() };
  localStorage.setItem(PROFILE_KEY, JSON.stringify(fresh));
  return fresh;
}

export default function Profile() {
  const [saved, setSaved] = useState(loadProfile);
  const [form, setForm] = useState(saved);
  const [errors, setErrors] = useState({});
  const [saveMessage, setSaveMessage] = useState("");
  const fileInputRef = useRef(null);

  const stats = getPlanStats();
  const isDirty = JSON.stringify(form) !== JSON.stringify(saved);

  // Navigation guard: Handle browser refresh/tab close
  useEffect(() => {
    function handleBeforeUnload(e) {
      if (isDirty) {
        e.preventDefault();
        e.returnValue = "You have unsaved changes. Are you sure you want to leave?";
      }
    }
    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  // Navigation guard: Handle browser back/forward
  useEffect(() => {
    function handlePopState(e) {
      if (isDirty) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmLeave) {
          window.history.pushState(null, "", window.location.href);
        }
      }
    }

    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => window.removeEventListener("popstate", handlePopState);
  }, [isDirty]);

  // Navigation guard: Catch all link clicks
  useEffect(() => {
    function handleLinkClick(e) {
      let target = e.target;
      while (target && target.tagName !== "A") {
        target = target.parentElement;
      }

      if (!target) return;

      const href = target.getAttribute("href");
      if (!href || href.startsWith("http") || href.startsWith("mailto:") || href.startsWith("tel:")) {
        return;
      }

      const isReactRouterLink = target.hasAttribute("data-rr-ui-event-key") ||
                               target.closest("[data-rr-ui-event-key]") !== null;

      if (isDirty && (href || isReactRouterLink)) {
        const confirmLeave = window.confirm(
          "You have unsaved changes. Are you sure you want to leave?"
        );
        if (!confirmLeave) {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    }

    document.addEventListener("click", handleLinkClick, true);
    return () => document.removeEventListener("click", handleLinkClick, true);
  }, [isDirty]);

  function handleChange(field, value) {
    setForm((prev) => ({ ...prev, [field]: value }));
    setSaveMessage("");
  }

  function handlePhotoChange(e) {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => handleChange("photo", reader.result);
    reader.readAsDataURL(file);
  }

  function validate(values) {
    const newErrors = {};
    if (!values.fullName.trim()) newErrors.fullName = "Full name is required.";
    if (!values.email.trim()) {
      newErrors.email = "Email is required.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = "Enter a valid email address.";
    }
    if (!values.phone.trim()) newErrors.phone = "Phone number is required.";
    if (!values.role.trim()) newErrors.role = "Role is required.";
    return newErrors;
  }

  function handleSave() {
    const validationErrors = validate(form);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length > 0) return;

    localStorage.setItem(PROFILE_KEY, JSON.stringify(form));
    setSaved(form);
    setSaveMessage("Changes saved.");
  }

  function handleCancel() {
    setForm(saved);
    setErrors({});
    setSaveMessage("");
  }

  const memberSinceLabel = form.memberSince
    ? new Date(form.memberSince).toLocaleDateString("en-US", {
        month: "short",
        year: "numeric",
      })
    : "—";

  return (
    <div className="profile-page">
      <div className="profile-banner">
        <h1>My Profile</h1>
        <p>Manage your personal details</p>
      </div>

      <div className="profile-card">
        <div className="profile-photo-block">
          <div className="profile-photo">
            {form.photo ? (
              <img src={form.photo} alt="Profile" />
            ) : (
              <span>{form.fullName?.[0]?.toUpperCase() || "?"}</span>
            )}
          </div>
          <button
            type="button"
            className="change-photo-btn"
            onClick={() => fileInputRef.current?.click()}
          >
            Change Photo
          </button>
          <input
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handlePhotoChange}
            style={{ display: "none" }}
          />

          <div className="profile-stats">
            <div className="stat">
              <span className="stat-value">{stats.plansCreated}</span>
              <span className="stat-label">Plans Created</span>
            </div>
            <div className="stat">
              <span className="stat-value">{stats.completionRate}%</span>
              <span className="stat-label">Completion Rate</span>
            </div>
            <div className="stat">
              <span className="stat-value">{memberSinceLabel}</span>
              <span className="stat-label">Member Since</span>
            </div>
          </div>
        </div>

        <div className="profile-form">
          <label>
            Full Name
            <input
              type="text"
              value={form.fullName}
              onChange={(e) => handleChange("fullName", e.target.value)}
              placeholder="Enter your full name"
            />
            {errors.fullName && <span className="field-error">{errors.fullName}</span>}
          </label>

          <label>
            Email
            <input
              type="email"
              value={form.email}
              onChange={(e) => handleChange("email", e.target.value)}
              placeholder="Enter your email"
            />
            {errors.email && <span className="field-error">{errors.email}</span>}
          </label>

          <label>
            Phone
            <input
              type="text"
              value={form.phone}
              onChange={(e) => handleChange("phone", e.target.value)}
              placeholder="Enter your phone number"
            />
            {errors.phone && <span className="field-error">{errors.phone}</span>}
          </label>

          <label>
            Role
            <input
              type="text"
              value={form.role}
              onChange={(e) => handleChange("role", e.target.value)}
              placeholder="Enter your role"
            />
            {errors.role && <span className="field-error">{errors.role}</span>}
          </label>

          <label>
            Bio
            <textarea
              rows={3}
              value={form.bio}
              onChange={(e) => handleChange("bio", e.target.value)}
              placeholder="Tell us about yourself..."
            />
          </label>

          <div className="profile-actions">
            <button type="button" className="save-btn" onClick={handleSave}>
              Save Changes
            </button>
            <button
              type="button"
              className="cancel-btn"
              onClick={handleCancel}
              disabled={!isDirty}
            >
              Cancel
            </button>
            {saveMessage && <span className="save-message">{saveMessage}</span>}
          </div>
        </div>
      </div>
    </div>
  );
}