import "./App.scss";
import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
function App() {
  const [user, setUser] = useState(null);

  const getUser = async () => {
    try {
      const url = "http://localhost:90/google/callback";
      const { data } = await axios.get(url, {
        withCredentials: true,
      });
      setUser(data.user._json);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getUser();
    console.log(user);
  });

  return (
    <>
      <BrowserRouter>
        {localStorage.getItem("userType") !== "admin" && <Header />}
        <Body />
        {localStorage.getItem("userType") !== "admin" && <Footer />}
      </BrowserRouter>
      <ToastContainer></ToastContainer>
    </>
  );
}

export default App;
