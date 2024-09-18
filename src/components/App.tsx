import "../styles/App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FavoritesProvider } from "../context/FavoritesContext";

function App() {
  return (
    <>
      <FavoritesProvider>
        <Navbar />
        <Outlet />
        <Footer />
      </FavoritesProvider>
    </>
  );
}

export default App;
