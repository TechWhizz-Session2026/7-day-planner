import React from "react";
import './PlansHome.css';
import { Link } from "react-router-dom";

const PlansHome = () => {
  const [user, setUser] = React.useState({
    name: "Oluwaseun",
    plans: [
      { id: 1, title: "Read for Exam", priority: "High", status: "Pending", dueDate: "20 Sept" },
      { id: 2, title: "Client Presentation", priority: "Medium", status: "Pending", dueDate: "22 Sept" },
      { id: 3, title: "Gym Session", priority: "Low", status: "Pending", dueDate: "23 Sept" }
    ]
  });

  const totalTasks = user.plans.length;
  const pendingTasks = user.plans.filter(p => p.status === "Pending").length;
  const completedTasks = user.plans.filter(p => p.status === "Completed").length;
  const overdueTasks = user.plans.filter(p => p.status === "Overdue").length;

  const highCount = user.plans.filter(p => p.priority === "High").length;
  const medCount = user.plans.filter(p => p.priority === "Medium").length;
  const lowCount = user.plans.filter(p => p.priority === "Low").length;

  const getPercent = (count) => (totalTasks > 0 ? Math.round((count / totalTasks) * 100) : 0);

  const priorities = [
    { label: "High Priority", tasks: highCount, percent: getPercent(highCount), color: "#C53030" },
    { label: "Medium Priority", tasks: medCount, percent: getPercent(medCount), color: "#DD6B20" },
    { label: "Low Priority", tasks: lowCount, percent: getPercent(lowCount), color: "#2F855A" },
  ];


  const upcomingDueDates = user.plans.filter(p => p.status !== "Completed");

  return (
    <div className="plans-home">
      <div className="top-bar">
        <div className="greetings">
          <div>Good Morning, {user.name}</div>
          <p>Here's your week at a glance</p>
        </div>
      </div>

      <div className="plans-home-content">
        {totalTasks === 0 ? (
          <div className="empty-state">
            <h3>No plans found</h3>
            <p>Get started by creating your first plan for the week.</p>
            <Link to="/dashboard/new-plans" className="add-new-plan">+ New Plan</Link>
          </div>
        ) : (
          <>
            <div className="dashboard-stats">
              <div className="stats">
                <div className="outer-circle">
                  <div className="inner-circle"></div>
                </div>
                <div className="stat-num">{totalTasks}</div>
                <div className="stat-text">Total Tasks</div>
              </div>
              <div className="stats orange">
                <div style={{ background: "rgba(255, 166, 0, 0.215)" }} className="outer-circle">
                  <div style={{ background: "rgba(255, 166, 0, 1)" }} className="inner-circle"></div>
                </div>
                <div className="stat-num">{pendingTasks}</div>
                <div className="stat-text">Pending</div>
              </div>
              <div className="stats green">
                <div style={{ background: "rgba(144, 238, 144, 0.2)" }} className="outer-circle">
                  <div style={{ background: "rgba(144, 238, 144, 1)" }} className="inner-circle"></div>
                </div>
                <div className="stat-num">{completedTasks}</div>
                <div className="stat-text">Completed</div>
              </div>
              <div className="stats red">
                <div style={{ background: "rgba(255, 0, 0, 0.2)" }} className="outer-circle">
                  <div style={{ background: "rgba(255, 0, 0, 1)" }} className="inner-circle"></div>
                </div>
                <div className="stat-num">{overdueTasks}</div>
                <div className="stat-text">Overdue</div>
              </div>
            </div>

            <div className="dashboard-reports">
              <div className="report">
                <div className="report-heading">Plans by Priority</div>
                <div className="report-content">
                  {priorities.map((item, index) => (
                    <div key={index} className="priority-row">
                      <div className="priority-header">
                        <span className="priority-label">{item.label}</span>
                        <span className="priority-tasks">{item.tasks} tasks</span>
                      </div>
                      <div className="priority-track">
                        <div
                          className="priority-fill"
                          style={{
                            width: `${item.percent}%`,
                            backgroundColor: item.color,
                          }}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="report">
                <div className="report-heading">Upcoming Due Dates</div>
                <div className="report-content scrollable-list">
                  {upcomingDueDates.length === 0 ? (
                    <p className="no-due-dates">No active due dates</p>
                  ) : (
                    upcomingDueDates.map((plan) => (
                      <div key={plan.id} className="due-date-row">
                        <span className="due-date-label">{plan.title}</span>
                        <span className="due-date-value">{plan.dueDate}</span>
                      </div>
                    ))
                  )}
                </div>
                <Link to="/dashboard/new-plans" className="add-new-plan">+ New Plan</Link>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default PlansHome;