import "../styles/App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FavoritesProvider } from "../context/FavoritesContext";
import Favorites from "../pages/Favorites";

function App() {
    return (
        <>
            <FavoritesProvider>
                <Navbar />
                <Outlet />
                <Footer />
                <Favorites />
            </FavoritesProvider>
        </>
    );
}

export default App;
