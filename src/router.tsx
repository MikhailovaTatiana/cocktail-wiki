import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";
import CocktailDetails from "./components/CocktailDetails";

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
        element: <CocktailDetails />,
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
