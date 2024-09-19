import '../styles/Favorites.css';
import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Hämta favoriter och removeFavorite från Context

  return (
    <div className="container">
      <h1 className="header">Favorites</h1>

      {/* Visa meddelande om inga favoriter finns */}
      {favorites.length === 0 ? (
        <p className="emptyMessage">Du har inga sparade favoriter</p>
      ) : (
        <div className="grid">
          {favorites.map((drink, index) => (
            <div key={index} className="card">
              <img
                src={drink.imgUrl || 'https://via.placeholder.com/250'}
                alt={drink.name || 'Unnamed drink'}
                className="image"
              />
              <h2 className="drinkName">{drink.name}</h2>
              <button
                className="removeButton"
                onClick={() => removeFavorite(drink.name)}
              >
                Remove
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;





