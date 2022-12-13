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
import Books from "../../pages/Books";
import SingleBook from "../../pages/SingleBook";
import MyRentRequest from "../dashboard/MyRentRequest";
import AudioBookUpload from "../audio-book/AudioBookUpload";
import EBookUpload from "../e-book/EBookUpload";
import MyExchangeRequest from "../dashboard/MyExchangeRequest";
import Messenger from "../messenger/Messenger";
import SingleAudioBook from "../singleaudiobook/SingleAudioBook";
import EbookSingleBook from "../../pages/EbookSingleBook";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route path="/singlebook/:book_id/:authormain" element={<SingleBook />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<MyBooks />} />
          <Route path="request" element={<MyRentRequest />} />
          <Route path="exchangerequest" element={<MyExchangeRequest />} />
          <Route path="messages" element={<Messenger />} />
        </Route>
        <Route path="/dashboard_admin" element={<DashboardAdmin />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="admin_approve" element={<AdminApprove />} />
          <Route path="audio_book" element={<AudioBookUpload />} />
          <Route path="ebook" element={<EBookUpload />} />
        </Route>
      </Routes>
    </>
  );
};

export default Body;
