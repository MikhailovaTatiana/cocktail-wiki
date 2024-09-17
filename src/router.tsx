import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { DrinkInfo } from "./pages/DrinkInfo";
import { NotFound } from "./pages/NotFound";
import Favorites from "./pages/Favorites";  // Importera Favorites-sidan

export const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "/info",
                element: <DrinkInfo />,
            },
            {
                path: "/search",
                element: <Search />,
            },
            {
                path: "/favorites",  // Lägg till route för Favorites
                element: <Favorites />,
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
