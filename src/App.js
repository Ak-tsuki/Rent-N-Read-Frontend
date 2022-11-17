import "./App.scss";
import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";
function App() {
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
