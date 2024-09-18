import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import { NotFound } from "./pages/NotFound";
import DrinkInfo from "./pages/DrinkInfo";
import Favorites from "./pages/Favorites";

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
        path: "/info",
        element: <DrinkInfo />,
      },
      {
        path: "/search",
        element: <Search />,
      },
    //   {
    //     path: "/favorites",
    //     element: <Favorites />,
    //   },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
]);