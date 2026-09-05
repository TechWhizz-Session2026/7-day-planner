import { NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <>
      <div>
      
      </div>
      <div className="dashboard">
        <section className="dashboard-nav">
          <NavLink to="/dashboard/home">Plans Home</NavLink>
          <NavLink to="/dashboard/new-plans">New Plans</NavLink>
        </section>
        <Outlet />
      </div>
    </>
  );
};

export default Dashboard;
