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
import Loginsuccess from "../../pages/Loginsuccess";
import Onlybooks from "../../pages/Onlybooks";
import OnlyEBooks from "../../pages/OnlyEBook";
import OnlyAudioBooks from "../../pages/OnlyAudioBooks";
import ContactUs from "../../pages/ContactUs";
import InboxMain from "../Inbox/InboxMain";
import ForgetPasswordEmail from "../../pages/ForgetPasswordEmail";
import OtpPasswordreset from "../../pages/OtpPasswordreset";
import PrivateRoute from "../../ProtectedRoute";
import NotFound from "../../pages/NotFound";
import About from "../../pages/About";

const Body = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/loginsuccess" element={<Loginsuccess />} />
        <Route path="/books" element={<Books />} />
        <Route path="/onlybooks" element={<Onlybooks />} />
        <Route path="/onlyebooks" element={<OnlyEBooks />} />
        <Route path="/onlyaudiobooks" element={<OnlyAudioBooks />} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path="/about" element={<About />} />
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
        <Route path="/forgetpassword" element={<ForgetPasswordEmail />} />

        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <PrivateRoute>
                <MyBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="request"
            element={
              <PrivateRoute>
                <MyRentRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="exchangerequest"
            element={
              <PrivateRoute>
                <MyExchangeRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="messages"
            element={
              <PrivateRoute>
                <Messenger />
              </PrivateRoute>
            }
          />
          <Route
            path="myebooks"
            element={
              <PrivateRoute>
                <MyEBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="myaudiobooks"
            element={
              <PrivateRoute>
                <MyAudioBooks />
              </PrivateRoute>
            }
          />
          <Route
            path="setting"
            element={
              <PrivateRoute>
                <Setting />
              </PrivateRoute>
            }
          />
          <Route
            path="Profilepage"
            element={
              <PrivateRoute>
                <ProfilePage />
              </PrivateRoute>
            }
          ></Route>
        </Route>
        <Route
          path="/dashboard_admin"
          element={
            <PrivateRoute>
              <DashboardAdmin />
            </PrivateRoute>
          }
        >
          <Route
            path=""
            element={
              <PrivateRoute>
                <DashboardHome />
              </PrivateRoute>
            }
          />
          <Route
            path="admin_approve"
            element={
              <PrivateRoute>
                {" "}
                <AdminApprove />
              </PrivateRoute>
            }
          />
          <Route
            path="inbox"
            element={
              <PrivateRoute>
                <InboxMain />
              </PrivateRoute>
            }
          />
          <Route
            path="audio_book"
            element={
              <PrivateRoute>
                <AudioBookUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="ebook"
            element={
              <PrivateRoute>
                <EBookUpload />
              </PrivateRoute>
            }
          />
          <Route
            path="request"
            element={
              <PrivateRoute>
                <EBookRentRequest />
              </PrivateRoute>
            }
          />
          <Route
            path="profile"
            element={
              <PrivateRoute>
                <AdminProfile />
              </PrivateRoute>
            }
          />
          <Route
            path="adminSetting"
            element={
              <PrivateRoute>
                <AdminSettings />
              </PrivateRoute>
            }
          />
        </Route>
        <Route
          path="/wishlist"
          element={
            <PrivateRoute>
              <Wishlist />
            </PrivateRoute>
          }
        />
        <Route path="/*" element={<NotFound />} />
      </Routes>
    </>
  );
};

export default Body;
