import "../styles/App.css";
import { Outlet } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./Navbar";
import { FavoritesProvider } from '../context/FavoritesContext'; // Uppdaterad import-väg

function App() {
  return (
    <FavoritesProvider> {/* Omsluter hela appen */}
      <Navbar />
      <Outlet />
      <Footer />
    </FavoritesProvider>
  );
}

export default App;


