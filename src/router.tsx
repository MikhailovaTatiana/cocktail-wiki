import { createBrowserRouter } from "react-router-dom";
import App from "./components/App";
import { Home } from "./pages/Home";
import { Search } from "./pages/Search";
import NotFoundPage from "./pages/NotFound"; // Korrigerad import
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
        path: "cocktail/:id",  // Borttaget "/" för att använda relativ sökväg
        element: <DrinkInfo />,
      },
      {
        path: "search",
        element: <Search />,
      },
      {
        path: "favorites",
        element: <Favorites />,
      },
      // 404 sida, wildcard path måste vara sist
      {
        path: "*",
        element: <NotFoundPage />, // Bytte från NotFound till NotFoundPage
      },
    ],
  },
]);

