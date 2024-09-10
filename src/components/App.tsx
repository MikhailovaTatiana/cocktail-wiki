import "../styles/App.css";
import { Outlet } from "react-router-dom";
import Navbar from "./NavBar";

function App() {
    return (
        <>
        <Navbar/>
            <h1>App</h1>
            
            <Outlet />

        </>
    );
}

export default App;
