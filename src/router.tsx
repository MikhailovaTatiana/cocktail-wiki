import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";
import DrinkInfo from "./pages/DrinkInfo";
import { Favorite } from "./components/Favorite";

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
        path: "/cocktail/:id",
        element: <DrinkInfo />,
      },
      {
        path: "/previous-page",
        element: <DrinkInfo />,
      },
      {
        path: "/favorites",
        element: <Favorite />,
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
