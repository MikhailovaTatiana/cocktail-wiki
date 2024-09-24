import "../styles/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";
import LeftArrowIcon from "../assets/left-arrow.png";
import RightArrowIcon from "../assets/right-arrow.png";
import { Link, useNavigate } from "react-router-dom";

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
            <div className="pagination-container">
              <div className="arrow-placeholder">
                <button className="arrow-btn" disabled>
                  <img src={LeftArrowIcon} alt="Previous Page" />
                </button>
              </div>
              <span className="pages">Page 1 of 3</span>
              <div className="arrow-placeholder">
                <button className="arrow-btn" disabled>
                  <img src={RightArrowIcon} alt="Next Page" />
                </button>
              </div>
            </div>
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
    </main>
  );
};

export default Favorites;
