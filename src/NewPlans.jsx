import React, { useState, useEffect, useRef } from "react";
import {
  X,
  Plus,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ArrowLeft,
  Sparkles,
  Trash2,
  CheckCircle2,
} from "lucide-react";
import "./NewPlans.css";

// Assets
import step1Img from "./assets/step1-illustration.png";
import step2Img from "./assets/step2-illustration.png";
import step3Img from "./assets/step3-illustration.png";

const SUGGESTIONS = [
  "Gym workout 3x a week & 8 hours sleep",
  "Daily 30-min evening walk & meditation",
  "Weekend digital detox & book reading",
  "Family dinner & Sunday morning cycling",
  "Acoustic guitar practice & journaling",
];

const NewPlans = () => {
  // Step state (1, 2, or 3)
  const [step, setStep] = useState(1);

  // Step 1: Week Name
  const [weekName, setWeekName] = useState("");

  // Step 2: Plans list & current input fields
  const [plansList, setPlansList] = useState([]);
  const [planName, setPlanName] = useState("");
  const [priority, setPriority] = useState("");
  const [dueDate, setDueDate] = useState("");

  // Step 2: Dropdowns state
  const [isPriorityOpen, setIsPriorityOpen] = useState(false);
  const [isDatePickerOpen, setIsDatePickerOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);

  // Calendar dates representation (Week of September 2024)
  const calendarWeek = [
    { dayName: "MON", date: 18 },
    { dayName: "TUE", date: 19 },
    { dayName: "WED", date: 20 },
    { dayName: "THU", date: 21 },
    { dayName: "FRI", date: 22 },
    { dayName: "SAT", date: 23 },
    { dayName: "SUN", date: 24 },
  ];

  // Step 3: Personal time
  const [personalTime, setPersonalTime] = useState("");
  const [suggestionIdx, setSuggestionIdx] = useState(0);

  // Generation Modal
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [generatedPlan, setGeneratedPlan] = useState(null);

  // Refs for closing popovers on outside click
  const priorityRef = useRef(null);
  const datePickerRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (priorityRef.current && !priorityRef.current.contains(e.target)) {
        setIsPriorityOpen(false);
      }
      if (datePickerRef.current && !datePickerRef.current.contains(e.target)) {
        setIsDatePickerOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // --- Step 2 Actions ---
  const handleAddNewPlan = () => {
    if (!planName.trim()) return;

    const newPlanItem = {
      id: Date.now(),
      name: planName.trim(),
      priority: priority || "Medium Priority",
      dueDate: dueDate || "Not specified",
    };

    setPlansList((prev) => [...prev, newPlanItem]);
    // Reset inputs for the next plan
    setPlanName("");
    setPriority("");
    setDueDate("");
    setSelectedDay(null);
  };

  const handleRemovePlan = (id) => {
    setPlansList((prev) => prev.filter((p) => p.id !== id));
  };

  const handleSelectPriority = (val) => {
    setPriority(val);
    setIsPriorityOpen(false);
  };

  const handleSelectDate = (item) => {
    setSelectedDay(item.date);
    setDueDate(`${item.date} Sept, 2024`);
    setIsDatePickerOpen(false);
  };

  // --- Step 3 Actions ---
  const handleSuggest = () => {
    const nextSuggestion = SUGGESTIONS[suggestionIdx % SUGGESTIONS.length];
    setPersonalTime(nextSuggestion);
    setSuggestionIdx((prev) => prev + 1);
  };

  // --- Final Assembly & Save ---
  const handleGenerate = () => {
    // If user has filled the active form in step 2 but hasn't clicked "Add New", auto-include it
    let finalPlans = [...plansList];
    if (planName.trim()) {
      finalPlans.push({
        id: Date.now(),
        name: planName.trim(),
        priority: priority || "Medium Priority",
        dueDate: dueDate || "Not specified",
      });
    }

    // Default fallback if somehow empty
    if (finalPlans.length === 0) {
      finalPlans.push({
        id: Date.now(),
        name: "General Weekly Plan",
        priority: "Medium Priority",
        dueDate: "End of Week",
      });
    }

    const newWeeklyPlan = {
      id: `plan_${Date.now()}`,
      weekName: weekName.trim() || "Untitled Week Plan",
      plans: finalPlans,
      personalTime: personalTime.trim() || "Daily 30-min relaxation scheduled",
      createdAt: new Date().toISOString(),
      displayDate: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
    };

    // Save to localStorage for Home & Plans screens to read
    try {
      const existing = JSON.parse(localStorage.getItem("7day_weekly_plans") || "[]");
      const updated = [newWeeklyPlan, ...existing];
      localStorage.setItem("7day_weekly_plans", JSON.stringify(updated));
      window.dispatchEvent(new Event("7day_plans_updated"));
    } catch (err) {
      console.error("Error saving plan to localStorage:", err);
    }

    setGeneratedPlan(newWeeklyPlan);
    setShowSuccessModal(true);
  };

  const handleResetWizard = () => {
    setShowSuccessModal(false);
    setStep(1);
    setWeekName("");
    setPlansList([]);
    setPlanName("");
    setPriority("");
    setDueDate("");
    setPersonalTime("");
    setSelectedDay(null);
  };

  // Step 2 Next Handler: moves to step 3, auto-committing current plan if typed
  const handleStep2Next = () => {
    if (planName.trim()) {
      handleAddNewPlan();
    }
    setStep(3);
  };

  return (
    <div className="new-plans-page">
      <div className="new-plans-card-wrapper">
        {/* Top Greeting Banner */}
        <div className="greeting-banner">
          <h2 className="greeting-title">Good Morning, Oluwaseun</h2>
          <p className="greeting-sub">Let's Plan your Week Together !</p>
        </div>

        {/* Wizard Main Card */}
        <div className="wizard-card">
          {/* ============================================================
              STEP 1: Name your Week
             ============================================================ */}
          {step === 1 && (
            <>
              <div className="wizard-form-col">
                <h1 className="wizard-step-heading">Name your Week 🤨</h1>
                <p className="wizard-step-desc">
                  Give your weekly plans a name, e.g. RUNACOSS planing quarterly
                  roadmap...
                </p>

                {/* Week Name Input with (X) Clear Button */}
                <div className="single-input-wrapper">
                  <input
                    type="text"
                    id="week-name-input"
                    className="single-text-input"
                    placeholder="Trade Fair"
                    value={weekName}
                    onChange={(e) => setWeekName(e.target.value)}
                  />
                  {weekName && (
                    <button
                      type="button"
                      className="input-clear-icon-btn"
                      onClick={() => setWeekName("")}
                      title="Clear"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  )}
                </div>

                {/* Floating Info Card */}
                <div className="floating-info-card">
                  This is where all your all your content for the set week lives.
                </div>

                {/* Navigation Button */}
                <div className="wizard-actions-row">
                  <button
                    type="button"
                    id="step1-next-btn"
                    className="btn-wizard-primary"
                    onClick={() => {
                      if (weekName.trim()) setStep(2);
                    }}
                    disabled={!weekName.trim()}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                </div>
              </div>

              {/* Illustration */}
              <div className="wizard-illustration-col">
                <img
                  src={step1Img}
                  alt="Calendar planning illustration"
                  className="wizard-illustration-img"
                />
              </div>
            </>
          )}

          {/* ============================================================
              STEP 2: What are your plans for this week ?
             ============================================================ */}
          {step === 2 && (
            <>
              <div className="wizard-form-col">
                <h1 className="wizard-step-heading">
                  What are your plans for this week ? 🌚
                </h1>

                {/* Sub-header: Plan Index & + Add New */}
                <div className="step2-form-header">
                  <span className="step2-plan-tag">
                    Plan {plansList.length + 1}
                  </span>
                  <button
                    type="button"
                    id="add-new-plan-btn"
                    className="step2-add-new-btn"
                    onClick={handleAddNewPlan}
                    disabled={!planName.trim()}
                  >
                    <Plus size={14} strokeWidth={2.5} /> Add New
                  </button>
                </div>

                {/* 3 Connected Segmented Input Rows */}
                <div className="step2-segmented-wrapper">
                  {/* Row 1: Name */}
                  <div className="segmented-input-row">
                    <div className="seg-label-box">Name</div>
                    <div className="seg-field-box">
                      <input
                        type="text"
                        id="plan-name-input"
                        className="seg-text-input"
                        placeholder="Read for Exam"
                        value={planName}
                        onChange={(e) => setPlanName(e.target.value)}
                        onKeyDown={(e) => {
                          if (e.key === "Enter") handleAddNewPlan();
                        }}
                      />
                    </div>
                  </div>

                  {/* Row 2: Priority Dropdown */}
                  <div className="segmented-input-row" ref={priorityRef}>
                    <div className="seg-label-box">Priority</div>
                    <div
                      className="seg-field-box"
                      onClick={() => setIsPriorityOpen((prev) => !prev)}
                    >
                      <div className="seg-dropdown-trigger">
                        <span
                          className={
                            priority ? "" : "seg-dropdown-placeholder"
                          }
                        >
                          {priority || "Select priority"}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`seg-chevron-icon ${
                            isPriorityOpen ? "open" : ""
                          }`}
                        />
                      </div>

                      {/* Custom Dark Priority Menu */}
                      {isPriorityOpen && (
                        <div className="priority-dropdown-menu">
                          {["High Priority", "Medium Priority", "Low Priority"].map(
                            (p) => (
                              <div
                                key={p}
                                className="priority-dropdown-item"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleSelectPriority(p);
                                }}
                              >
                                <div
                                  className={`priority-radio-circle ${
                                    priority === p ? "selected" : ""
                                  }`}
                                >
                                  {priority === p && (
                                    <div className="priority-radio-dot" />
                                  )}
                                </div>
                                <span>{p}</span>
                              </div>
                            )
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Row 3: Due date Dropdown */}
                  <div className="segmented-input-row" ref={datePickerRef}>
                    <div className="seg-label-box">Due date</div>
                    <div
                      className="seg-field-box"
                      onClick={() => setIsDatePickerOpen((prev) => !prev)}
                    >
                      <div className="seg-dropdown-trigger">
                        <span
                          className={
                            dueDate ? "" : "seg-dropdown-placeholder"
                          }
                        >
                          {dueDate || "Select date"}
                        </span>
                        <ChevronDown
                          size={18}
                          className={`seg-chevron-icon ${
                            isDatePickerOpen ? "open" : ""
                          }`}
                        />
                      </div>

                      {/* Custom Week Calendar Popover */}
                      {isDatePickerOpen && (
                        <div
                          className="due-date-calendar-popover"
                          onClick={(e) => e.stopPropagation()}
                        >
                          <div className="calendar-header">
                            <span className="calendar-month-label">
                              September 2024 <ChevronRight size={14} />
                            </span>
                            <div className="calendar-arrows">
                              <button
                                type="button"
                                className="calendar-nav-btn"
                                title="Previous"
                              >
                                <ChevronLeft size={14} />
                              </button>
                              <button
                                type="button"
                                className="calendar-nav-btn"
                                title="Next"
                              >
                                <ChevronRight size={14} />
                              </button>
                            </div>
                          </div>

                          {/* Day Labels */}
                          <div className="calendar-weekdays-row">
                            {calendarWeek.map((c) => (
                              <span key={c.dayName}>{c.dayName}</span>
                            ))}
                          </div>

                          {/* Day Numbers Grid */}
                          <div className="calendar-days-grid">
                            {calendarWeek.map((c) => (
                              <button
                                key={c.date}
                                type="button"
                                className={`calendar-day-cell ${
                                  selectedDay === c.date ? "active" : ""
                                }`}
                                onClick={() => handleSelectDate(c)}
                              >
                                {c.date}
                              </button>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* List of Added Plans (Matches Screenshot with Plan 1, Plan 2, etc.) */}
                {plansList.length > 0 && (
                  <div className="added-plans-section">
                    {plansList.map((item, idx) => (
                      <div key={item.id} className="added-plan-item-card">
                        <div className="added-plan-label-box">
                          Plan {idx + 1}
                        </div>
                        <div className="added-plan-details-box">
                          <span className="added-plan-title">{item.name}</span>
                          <div className="added-plan-meta">
                            {item.priority && (
                              <span
                                className={`added-plan-priority-badge ${
                                  item.priority.includes("High")
                                    ? "badge-high"
                                    : item.priority.includes("Medium")
                                    ? "badge-medium"
                                    : "badge-low"
                                }`}
                              >
                                {item.priority.replace(" Priority", "")}
                              </span>
                            )}
                            <button
                              type="button"
                              className="btn-remove-plan"
                              title="Delete plan"
                              onClick={() => handleRemovePlan(item.id)}
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Navigation Buttons */}
                <div className="wizard-actions-row">
                  <button
                    type="button"
                    id="step2-next-btn"
                    className="btn-wizard-primary"
                    onClick={handleStep2Next}
                    disabled={plansList.length === 0 && !planName.trim()}
                  >
                    Next <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn-wizard-back"
                    onClick={() => setStep(1)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                </div>
              </div>

              {/* Illustration */}
              <div className="wizard-illustration-col">
                <img
                  src={step2Img}
                  alt="Weekly schedule illustration"
                  className="wizard-illustration-img"
                />
              </div>
            </>
          )}

          {/* ============================================================
              STEP 3: Personal Time + Generate
             ============================================================ */}
          {step === 3 && (
            <>
              <div className="wizard-form-col">
                <h1 className="wizard-step-heading">Personal Time 🤨</h1>
                <p className="wizard-step-desc">
                  “Scheduling personal time is important for maintaining
                  work-life balance” lets set one for you.
                </p>

                {/* Single Input with (X) Clear Button */}
                <div className="single-input-wrapper">
                  <input
                    type="text"
                    id="personal-time-input"
                    className="single-text-input"
                    placeholder="e.g. Gym 3x a week, 8h sleep"
                    value={personalTime}
                    onChange={(e) => setPersonalTime(e.target.value)}
                  />
                  {personalTime && (
                    <button
                      type="button"
                      className="input-clear-icon-btn"
                      onClick={() => setPersonalTime("")}
                      title="Clear"
                    >
                      <X size={12} strokeWidth={3} />
                    </button>
                  )}
                </div>

                {/* Suggest For Me Button */}
                <button
                  type="button"
                  id="suggest-personal-time-btn"
                  className="btn-suggest-pill"
                  onClick={handleSuggest}
                >
                  Suggest for me <Sparkles size={14} />
                </button>

                {/* Floating Info Card */}
                <div className="floating-info-card">
                  On tapping on generate your personalized weekly planner will
                  be created to suit your needs
                </div>

                {/* Navigation Buttons */}
                <div className="wizard-actions-row">
                  <button
                    type="button"
                    id="generate-plan-btn"
                    className="btn-wizard-primary"
                    onClick={handleGenerate}
                  >
                    Generate <ArrowRight size={16} />
                  </button>
                  <button
                    type="button"
                    className="btn-wizard-back"
                    onClick={() => setStep(2)}
                  >
                    <ArrowLeft size={16} /> Back
                  </button>
                </div>
              </div>

              {/* Illustration */}
              <div className="wizard-illustration-col">
                <img
                  src={step3Img}
                  alt="Work life balance relaxation illustration"
                  className="wizard-illustration-img"
                />
              </div>
            </>
          )}

          {/* Persistent Step Indicator at Bottom Right */}
          <div className="step-indicator-tag">Step {step}/3</div>
        </div>
      </div>

      {/* ============================================================
          Success Confirmation Modal (Assembles all 3 steps)
         ============================================================ */}
      {showSuccessModal && generatedPlan && (
        <div className="generation-success-overlay">
          <div className="generation-success-modal">
            <div className="success-icon-badge">
              <CheckCircle2 size={36} />
            </div>
            <h3 className="success-modal-title">Weekly Plan Generated!</h3>
            <p className="success-modal-desc">
              Your 7-day planner for <strong>"{generatedPlan.weekName}"</strong>{" "}
              has been successfully assembled and saved.
            </p>

            <div className="success-plan-summary">
              <div className="success-summary-item">
                <strong>Week:</strong> {generatedPlan.weekName}
              </div>
              <div className="success-summary-item">
                <strong>Scheduled Plans:</strong> {generatedPlan.plans.length} item(s)
              </div>
              <div className="success-summary-item">
                <strong>Personal Time:</strong> {generatedPlan.personalTime}
              </div>
              <div className="success-summary-item">
                <strong>Created:</strong> {generatedPlan.displayDate}
              </div>
            </div>

            <div className="success-modal-actions">
              <button
                type="button"
                className="btn-wizard-primary"
                onClick={handleResetWizard}
              >
                Create Another Plan
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NewPlans;
