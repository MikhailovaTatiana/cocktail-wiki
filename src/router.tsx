import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { DrinkInfo } from "./pages/DrinkInfo";
import { NotFound } from "./pages/NotFound";

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
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
