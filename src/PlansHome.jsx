import React, { useState, useEffect } from "react";
import { Calendar, Clock, CheckCircle, Plus } from "lucide-react";
import { Link } from "react-router-dom";

const PlansHome = () => {
  const [plans, setPlans] = useState([]);

  const loadPlans = () => {
    try {
      const stored = JSON.parse(localStorage.getItem("7day_weekly_plans") || "[]");
      setPlans(stored);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    loadPlans();
    window.addEventListener("7day_plans_updated", loadPlans);
    return () => window.removeEventListener("7day_plans_updated", loadPlans);
  }, []);

  return (
    <div style={{ flex: 1, padding: "28px 36px", backgroundColor: "#FFFFFF", fontFamily: "'Inter', sans-serif" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px" }}>
        <div>
          <h2 style={{ margin: 0, fontSize: "22px", color: "#0F172A", fontWeight: 700 }}>Weekly Plans</h2>
          <p style={{ margin: "4px 0 0 0", fontSize: "14px", color: "#64748B" }}>
            View and manage your generated weekly roadmaps
          </p>
        </div>
        <Link
          to="/dashboard/new-plans"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            backgroundColor: "#00509E",
            color: "#FFFFFF",
            padding: "8px 16px",
            borderRadius: "6px",
            textDecoration: "none",
            fontWeight: 600,
            fontSize: "13.5px"
          }}
        >
          <Plus size={16} /> New Plan
        </Link>
      </div>

      {plans.length === 0 ? (
        <div
          style={{
            background: "#F8FAFC",
            border: "1.5px dashed #CBD5E1",
            borderRadius: "12px",
            padding: "40px",
            textAlign: "center"
          }}
        >
          <Calendar size={42} color="#94A3B8" style={{ marginBottom: "12px" }} />
          <h3 style={{ margin: "0 0 8px 0", fontSize: "16px", color: "#334155" }}>No weekly plans generated yet</h3>
          <p style={{ margin: "0 0 16px 0", fontSize: "13.5px", color: "#64748B" }}>
            Start by creating your first 7-day plan in the New Plan wizard.
          </p>
          <Link
            to="/dashboard/new-plans"
            style={{
              color: "#00509E",
              fontWeight: 600,
              fontSize: "14px",
              textDecoration: "underline"
            }}
          >
            Create a New Plan →
          </Link>
        </div>
      ) : (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: "20px" }}>
          {plans.map((p) => (
            <div
              key={p.id}
              style={{
                background: "#F1F6FE",
                borderRadius: "12px",
                border: "1px solid #DBEAFE",
                padding: "20px",
                boxShadow: "0 4px 12px rgba(0,0,0,0.03)"
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "12px" }}>
                <h3 style={{ margin: 0, fontSize: "17px", color: "#0F172A", fontWeight: 700 }}>{p.weekName}</h3>
                <span
                  style={{
                    fontSize: "11.5px",
                    fontWeight: 600,
                    backgroundColor: "#DCFCE7",
                    color: "#15803D",
                    padding: "3px 8px",
                    borderRadius: "4px"
                  }}
                >
                  Active
                </span>
              </div>

              <div style={{ marginBottom: "14px" }}>
                <div style={{ fontSize: "12px", fontWeight: 700, color: "#475569", textTransform: "uppercase", marginBottom: "6px" }}>
                  Plans ({p.plans?.length || 0})
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: "6px" }}>
                  {p.plans?.map((item, idx) => (
                    <div
                      key={idx}
                      style={{
                        background: "#FFFFFF",
                        padding: "8px 12px",
                        borderRadius: "6px",
                        border: "1px solid #E2E8F0",
                        display: "flex",
                        justifyContent: "space-between",
                        fontSize: "13px"
                      }}
                    >
                      <span style={{ fontWeight: 600, color: "#1E293B" }}>{item.name}</span>
                      <span style={{ fontSize: "11.5px", color: "#64748B" }}>{item.dueDate}</span>
                    </div>
                  ))}
                </div>
              </div>

              {p.personalTime && (
                <div
                  style={{
                    background: "#FFFFFF",
                    padding: "10px 12px",
                    borderRadius: "6px",
                    border: "1px solid #E2E8F0",
                    fontSize: "12.5px",
                    color: "#334155",
                    display: "flex",
                    alignItems: "center",
                    gap: "8px"
                  }}
                >
                  <Clock size={15} color="#00509E" />
                  <span>
                    <strong>Personal Time:</strong> {p.personalTime}
                  </span>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default PlansHome;
