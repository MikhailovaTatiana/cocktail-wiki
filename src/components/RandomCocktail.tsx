// import starIcon from '../assets/icons8-star-50.png';
import { useEffect, useState } from "react";
import "../styles/RandomCocktail.css";
import { useNavigate } from "react-router-dom";
import FavoriteButton from "./FavoriteButton";
import { Cocktail } from "../interfaces";

const CocktailCard = () => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [nextCocktail, setNextCocktail] = useState<Cocktail | null>(null); // Nästa cocktail som pre-fetchas
  const [loading, setLoading] = useState<boolean>(true);
  const Navigate = useNavigate(); // direct to another page

  // Function to fetch a random cocktail
  const fetchCocktail = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setCocktail(data.drinks[0]); // Sätt den hämtade cocktailen till nuvarande cocktail
    } catch (error) {
      console.error("Error fetching the cocktail:", error);
    } finally {
      setLoading(false);
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

  // Fetch a cocktail when the component mounts
  useEffect(() => {
    fetchCocktail();
    preFetchNextCocktail(); // Pre-fetch nästa cocktail för snabbare laddning
  }, []);

  const handleRandomClick = () => {
    if (nextCocktail) {
      setCocktail(nextCocktail); // Använd den förhämtade cocktailen
      preFetchNextCocktail(); // Pre-fetch nästa igen
    } else {
      fetchCocktail(); // Om pre-fetch misslyckas, fallback till vanlig fetch
    }
  };

  return (
    <section className="home-section">
      <button className="random-btn" onClick={handleRandomClick}>
        Random Cocktail
      </button>
      <section className="card">
        {loading ? (
          <div>Loading...</div>
        ) : cocktail ? (
          <>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="img-card" />
            <aside className="aside-card">
              <div className="star">
                <FavoriteButton
                  drinkName={cocktail.strDrink}
                  drinkImgUrl={cocktail.strDrinkThumb}
                />
              </div>
              <h2 className="drink-name">{cocktail.strDrink}</h2>
              <button
                onClick={() => Navigate(`/cocktail/${cocktail.idDrink}`)}
                className="see-more-btn"
              >
                See more
              </button>
            </aside>
          </>
        ) : (
          <div>No cocktail found.</div>
        )}
      </section>
    </section>
  );
};

export default CocktailCard;
