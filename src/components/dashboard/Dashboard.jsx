import React from "react";
import "./dashboard.scss";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
const Dashboard = () => {
  return (
    <div>
      <div className="dashboard-container">
        <DashboardNav />
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
