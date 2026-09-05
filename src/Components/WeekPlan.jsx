import { useEffect, useState } from "react";
import "./WeekPlan.css";

const initialPlans = [
  {
    id: 1,
    name: "Read for Exam",
    priority: "High",
    dueDate: "2026-09-20",
    completed: false,
  },
  {
    id: 2,
    name: "Client Presentation Prep",
    priority: "High",
    dueDate: "2026-09-22",
    completed: false,
  },
  {
    id: 3,
    name: "Grocery Run",
    priority: "Low",
    dueDate: "2026-09-21",
    completed: false,
  },
  {
    id: 4,
    name: "Team Standup Notes",
    priority: "Medium",
    dueDate: "2026-09-24",
    completed: false,
  },
  {
    id: 5,
    name: "Gym Session",
    priority: "Low",
    dueDate: "2026-09-23",
    completed: false,
  },
];

function WeekPlan() {
  const [plans, setPlans] = useState(() => {
    const savedPlans = localStorage.getItem("plans");

    return savedPlans ? JSON.parse(savedPlans) : initialPlans;
  });

  const [search, setSearch] = useState("");
  const [priority, setPriority] = useState("All");
  const [sortBy, setSortBy] = useState("dueDate");

  const [editingPlan, setEditingPlan] = useState(null);

  // Save plans whenever they change
  useEffect(() => {
    localStorage.setItem("plans", JSON.stringify(plans));
  }, [plans]);

  // Complete / incomplete
  const toggleComplete = (id) => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === id
          ? { ...plan, completed: !plan.completed }
          : plan
      )
    );
  };

  // Delete
  const deletePlan = (id) => {
    const plan = plans.find((item) => item.id === id);

    const confirmed = window.confirm(
      `Are you sure you want to delete "${plan.name}"?`
    );

    if (confirmed) {
      setPlans((currentPlans) =>
        currentPlans.filter((plan) => plan.id !== id)
      );
    }
  };

  // Edit
  const saveEdit = () => {
    setPlans((currentPlans) =>
      currentPlans.map((plan) =>
        plan.id === editingPlan.id ? editingPlan : plan
      )
    );

    setEditingPlan(null);
  };

  // Search + filter
  let filteredPlans = plans.filter((plan) =>
    plan.name.toLowerCase().includes(search.toLowerCase())
  );

  if (priority !== "All") {
    filteredPlans = filteredPlans.filter(
      (plan) => plan.priority === priority
    );
  }

  // Sorting
  filteredPlans.sort((a, b) => {
    if (sortBy === "name") {
      return a.name.localeCompare(b.name);
    }

    return new Date(a.dueDate) - new Date(b.dueDate);
  });

  return (
    <div className="plans-page">

      <main className="plans-content">

        {/* Page heading */}
        <div className="plans-header">
          <h1>Your Plans</h1>
          <p>View, filter and edit everything you've planned</p>
        </div>

        {/* Search and controls */}
        <div className="plans-controls">

          <div className="search-boxes">
            <span>⌕</span>

            <input
              type="text"
              placeholder="Search plans..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="filters">

            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
              <option value="All">All Priority</option>
              <option value="High">High Priority</option>
              <option value="Medium">Medium Priority</option>
              <option value="Low">Low Priority</option>
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="dueDate">Sort: Due Date</option>
              <option value="name">Sort: Name</option>
            </select>

          </div>
        </div>

        {/* Plans list */}
        {plans.length === 0 ? (

          <div className="empty-state">
            <h2>No plans yet</h2>
            <p>Create your first plan to get started.</p>
          </div>

        ) : filteredPlans.length === 0 ? (

          <div className="empty-state">
            <h2>No plans found</h2>
            <p>Try changing your search or filter.</p>
          </div>

        ) : (

          <div className="plans-list">

            {filteredPlans.map((plan) => (

              <div
                className={`plan-row ${
                  plan.completed ? "completed" : ""
                }`}
                key={plan.id}
              >

                <div className="plan-left">

                  <input
                    type="checkbox"
                    checked={plan.completed}
                    onChange={() => toggleComplete(plan.id)}
                  />

                  <span className="plan-name">
                    {plan.name}
                  </span>

                </div>

                <span
                  className={`priority ${plan.priority.toLowerCase()}`}
                >
                  {plan.priority} Priority
                </span>

                <span className="due-date">
                  {new Date(plan.dueDate).toLocaleDateString(
                    "en-GB",
                    {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                    }
                  )}
                </span>

                <div className="plan-actions">

                  <button
                    onClick={() => setEditingPlan({ ...plan })}
                    title="Edit"
                  >
                    ✏️
                  </button>

                  <button
                    onClick={() => deletePlan(plan.id)}
                    title="Delete"
                  >
                    🗑️
                  </button>

                </div>

              </div>

            ))}

          </div>

        )}

      </main>

      {/* Edit modal */}
      {editingPlan && (

        <div className="modal-overlay">

          <div className="edit-modal">

            <h2>Edit Plan</h2>

            <label>Plan name</label>

            <input
              type="text"
              value={editingPlan.name}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  name: e.target.value,
                })
              }
            />

            <label>Priority</label>

            <select
              value={editingPlan.priority}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  priority: e.target.value,
                })
              }
            >
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>

            <label>Due date</label>

            <input
              type="date"
              value={editingPlan.dueDate}
              onChange={(e) =>
                setEditingPlan({
                  ...editingPlan,
                  dueDate: e.target.value,
                })
              }
            />

            <div className="modal-buttons">

              <button
                className="cancel-btn"
                onClick={() => setEditingPlan(null)}
              >
                Cancel
              </button>

              <button
                className="save-btn"
                onClick={saveEdit}
              >
                Save Changes
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}

export default WeekPlan;
