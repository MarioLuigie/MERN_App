import Header from "./components/layout/Header";
import Main from "./components/layout/Main";
import Footer from "./components/layout/Footer";
// import { useLocation } from "react-router-dom";

export default function App() {
  // const location = useLocation();

  // console.log("APP", window.location.pathname);
  // console.log("APP", location.pathname);
  // console.log("APP", location.search);
  // console.log("APP", `${location.pathname}${location.search}`);

  return (
    <>
      <Header />
      <Main />
    </>
  )
}

