import React, { useState } from "react";
import "./dashboard.scss";
import { Outlet } from "react-router-dom";
import DashboardNav from "./DashboardNav";
import { RiDashboardFill } from "react-icons/ri";
const Dashboard = () => {
  const [navOpen, setNavOpen] = useState(true);
  const menuClickHandler = (e) => {
    e.preventDefault();
    setNavOpen((p) => !p);
  };
  return (
    <div className="dashboard-container" data-test="login success">
      <RiDashboardFill className="dashboard-btn" onClick={menuClickHandler} />
      <div className="dashboard">
        <DashboardNav open={navOpen} />
        <div className="dashboard-body">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
