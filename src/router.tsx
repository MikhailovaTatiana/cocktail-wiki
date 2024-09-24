import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";
import DrinkInfo from "./pages/DrinkInfo";
import Favorites from "./pages/Favorites";
import Ingredient from "./pages/Ingredient";
import CocktailDetails from "./pages/DrinkInfo";

export const router = createBrowserRouter([
  {
    element: <App />,
    path: "/",
    children: [
      // home page
      {
        index: true,
        element: <Home />,
      },
      // drinkinfo page
      {
        path: "/cocktail/:id",
        element: <DrinkInfo />,
      },
      // favorite page som hämtar drink id och skickar till drinkinfo
      {
        path: "/drinkinfo/:id",
        element: <CocktailDetails />,
      },
      // search page
      {
        path: "/search",
        element: <Search />,
      },
      // ingredient page
      {
        path: "/ingredient/:ingredientName",
        element: <Ingredient />,
      },
      // favorite page
      {
        path: "/favorites",
        element: <Favorites />,
      },
      // 404
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);
