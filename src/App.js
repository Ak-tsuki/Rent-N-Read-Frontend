import "./App.scss";
import Body from "./components/layout/Body";
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";
import { BrowserRouter } from "react-router-dom";
function App() {
  return (
    <>
      <BrowserRouter>
        <Header />
        <Body />
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
