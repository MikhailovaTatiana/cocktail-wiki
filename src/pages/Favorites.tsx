import "../styles/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";
import { Link } from "react-router-dom";
import Footer from "../components/Footer";

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Hämta favoriter och removeFavorite från Context

  return (
    <main className="main-favorites">
      <div className="content-container">
        <h1 className="header">Favorites</h1>

        {/* Visa meddelande om inga favoriter finns */}
        {favorites.length === 0 ? (
          <p className="emptyMessage">Du har inga sparade favoriter</p>
        ) : (
          <>
            <div className="cocktail-grid">
              {favorites.map((cocktail, index) => (
                <div className="cocktail-card" key={index}>
                  <Link to={`/drinkinfo/${cocktail.name}`}>
                    <img src={cocktail.imgUrl} alt={cocktail.name} />
                  </Link>
                  <h3 title={cocktail.name}>{cocktail.name}</h3>
                  <button className="remove-btn" onClick={() => removeFavorite(cocktail.name)}>
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </main>
  );
};

export default Favorites;
