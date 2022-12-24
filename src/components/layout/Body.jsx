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
import EBookRentRequest from "../dashboard-admin/EBookRentRequest";
import MyEBooks from "../dashboard/MyEBook";
import MyAudioBooks from "../dashboard/myaudiobook";
import Wishlist from "../../pages/Wishlist";
import Setting from "../../pages/setting";
import ProfilePage from "../profile/profilePage";
import AdminProfile from "../admin-profile/AdminProfile";
import AdminSettings from "../admin-profile/AdminSettings";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books" element={<Books />} />
        <Route
          path="/singlebook/:book_id/:authormain"
          element={<SingleBook />}
        />
        <Route
          path="/ebooksinglebook/:book_id/:authormain"
          element={<EbookSingleBook />}
        />
        <Route
          path="/singleaudiobook/:audiobook_id/:authormain"
          element={<SingleAudioBook />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />}>
          <Route path="" element={<MyBooks />} />
          <Route path="request" element={<MyRentRequest />} />
          <Route path="exchangerequest" element={<MyExchangeRequest />} />
          <Route path="messages" element={<Messenger />} />
          <Route path="myebooks" element={<MyEBooks />} />
          <Route path="myaudiobooks" element={<MyAudioBooks />} />
          <Route path="setting" element={<Setting />} />
          <Route path="Profilepage" element={<ProfilePage />}></Route>
        </Route>
        <Route path="/dashboard_admin" element={<DashboardAdmin />}>
          <Route path="" element={<DashboardHome />} />
          <Route path="admin_approve" element={<AdminApprove />} />
          <Route path="audio_book" element={<AudioBookUpload />} />
          <Route path="ebook" element={<EBookUpload />} />
          <Route path="request" element={<EBookRentRequest />} />
          <Route path="profile" element={<AdminProfile />} />
          <Route path="adminSetting" element={<AdminSettings />} />
        </Route>
        <Route path="/wishlist" element={<Wishlist />} />
      </Routes>
    </>
  );
};

export default Body;
