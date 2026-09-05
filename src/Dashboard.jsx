import { Outlet } from "react-router-dom";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <Outlet />
    </div>
  );
};

export default Dashboard;