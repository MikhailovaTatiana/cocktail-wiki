import "../styles/App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";

function App() {
  return (
    <>
      <h1>App</h1>
      <Outlet />
      <Footer />
    </>
  );
}

export default App;
