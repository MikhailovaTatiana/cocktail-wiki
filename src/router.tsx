import { createBrowserRouter, Navigate } from "react-router-dom";
import App from "./components/App";
import NotFound from "./NotFound";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      {
        path: "old-home",
        element: <Navigate to="/" />,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
