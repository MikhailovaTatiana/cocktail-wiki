import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import NotFound from "./pages/NotFound";

export const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);
