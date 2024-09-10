import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";

export const router = createBrowserRouter([
    {
        element: <App />,
        path: "/",
        children: [],
    },
]);
