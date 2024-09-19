import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton"; // Importera FavoriteButton-komponenten

// API tag
interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailCard = () => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null); // Huvudcocktail som visas
  const [nextCocktail, setNextCocktail] = useState<Cocktail | null>(null); // Nästa cocktail som pre-fetchas
  const [loading, setLoading] = useState<boolean>(true); // Visar laddning
  const navigate = useNavigate(); // Används för att navigera till en annan sida

  // Funktion för att hämta en slumpmässig cocktail
  const fetchCocktail = async () => {
    setLoading(true); // Sätt loading till true medan vi hämtar
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setCocktail(data.drinks[0]); // Sätt den hämtade cocktailen till nuvarande cocktail
    } catch (error) {
      console.error("Error fetching the cocktail:", error);
    } finally {
      setLoading(false); // Avsluta laddningen
    }
  };

  // Ny funktion: Pre-fetchar nästa cocktail i bakgrunden
  const preFetchNextCocktail = async () => {
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setNextCocktail(data.drinks[0]); // Sparar den förhämtade cocktailen
    } catch (error) {
      console.error("Error pre-fetching the next cocktail:", error);
    }
  };

  // När komponenten monteras, hämta en cocktail och pre-fetcha nästa
  useEffect(() => {
    fetchCocktail(); // Hämta första cocktail
    preFetchNextCocktail(); // Pre-fetch nästa cocktail för snabbare laddning
  }, []);

  // När användaren klickar på "Random Cocktail", visa den förhämtade cocktailen
  const handleRandomClick = () => {
    if (nextCocktail) {
      setCocktail(nextCocktail); // Använd den förhämtade cocktailen
      preFetchNextCocktail(); // Pre-fetch nästa igen
    } else {
      fetchCocktail(); // Om pre-fetch misslyckas, fallback till vanlig fetch
    }
  };

  return (
    <main className="home-main">
      <button className="random-btn" onClick={handleRandomClick}>
        Random Cocktail
      </button>
      <section className="card">
        {loading ? (
          <div>Loading...</div> // Visa laddning tills cocktailen har hämtats
        ) : cocktail ? (
          <>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="img-card" />
            <aside className="aside-card">
              <FavoriteButton
                drinkName={cocktail.strDrink}
                drinkImgUrl={cocktail.strDrinkThumb}
              />
              <h2 className="drink-name">{cocktail.strDrink}</h2>
              <button
                onClick={() => navigate(`/cocktail/${cocktail.idDrink}`)}
                className="see-more-btn"
              >
                See more
              </button>
            </aside>
          </>
        ) : (
          <div>No cocktail found.</div> // Om ingen cocktail hittades
        )}
      </section>
    </main>
  );
};

export default CocktailCard;




