import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import NotFound from "./pages/NotFound";
import { Home } from "./pages/Home";

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
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
