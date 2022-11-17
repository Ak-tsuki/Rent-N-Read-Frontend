import React from "react";
import Home from "../../pages/Home";
import { Route, Routes } from "react-router-dom";
import Login from "../login/Login";
import Register from "../register/Register";
import Dashboard from "../dashboard/Dashboard";
import MyBooks from "../dashboard/MyBooks";
import DashboardAdmin from "../dashboard-admin/DashboardAdmin";
import DashboardHome from "../dashboard-admin/DashboardHome";
import AdminApprove from "../admin-approveBook/AdminApprove";
const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<MyBooks />} />
        </Route>
        <Route path="/dashboard_admin" element={<DashboardAdmin />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="admin_approve" element={<AdminApprove />} />
        </Route>
      </Routes>
    </>
  );
};

export default Body;
