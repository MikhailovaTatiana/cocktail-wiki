import { useEffect, useState } from "react";
import "../styles/Home.css";
import { useNavigate } from "react-router-dom";

// api tag
interface Cocktail {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

const CocktailCard: React.FC = () => {
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const Navigate = useNavigate(); // direct to another page

  // Function to fetch a random cocktail
  const fetchCocktail = async () => {
    setLoading(true);
    try {
      const response = await fetch("https://www.thecocktaildb.com/api/json/v1/1/random.php");
      const data = await response.json();
      setCocktail(data.drinks[0]);
    } catch (error) {
      console.error("Error fetching the cocktail:", error);
    } finally {
      setLoading(false);
    }
  };

  // Fetch a cocktail when the component mounts
  useEffect(() => {
    fetchCocktail();
  }, []);

  return (
    <main className="home-main">
      <button className="random-btn" onClick={fetchCocktail}>
        Random Cocktail
      </button>
      <section className="card">
        {loading ? (
          <div>Loading...</div>
        ) : cocktail ? (
          <>
            <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} className="img-card" />
            <aside className="aside-card">
              <img className="star" src="src\assets\icons8-star-50.png" alt="star" />
              <h2 className="drink-name">{cocktail.strDrink}</h2>
              <button onClick={() => Navigate("/DrinkInfo")} className="see-more-btn">
                See more
              </button>
            </aside>
          </>
        ) : (
          <div>No cocktail found.</div>
        )}
      </section>
    </main>
  );
};

export default CocktailCard;
