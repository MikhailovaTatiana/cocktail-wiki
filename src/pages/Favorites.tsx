import '../styles/Favorites.css';

import AperolSpritz from '../assets/test-drink-bild.jpg';
import LeftArrowIcon from '../assets/left-arrow.png';
import RightArrowIcon from '../assets/right-arrow.png'

const cocktails = [
  { name: 'Aperol Spritz', image:AperolSpritz },
  { name: 'Mojito', image: AperolSpritz },
  { name: 'Dry Martini', image: AperolSpritz},
  { name: 'Old Cuban', image: AperolSpritz },
  { name: "Planter's Punch", image: AperolSpritz },
  { name: "Cocktail Horse's Neck", image: AperolSpritz },
  
];

const FavoriteCocktails = () => {
  return (
    <main className='main-favorites'>
      <div className="content-container">
        <div className="pagination-container">
          <div className="arrow-placeholder">
            <button className="arrow-btn" disabled>
              <img src={LeftArrowIcon} alt="Previous Page" />
            </button>
          </div>
          <span className="pages">
            Page 1 of 3
          </span>
          <div className="arrow-placeholder">
            <button className="arrow-btn" disabled>
              <img src={RightArrowIcon} alt="Next Page" />
            </button>
          </div>
        </div>
        
        <div className="cocktail-grid">
          {cocktails.map((cocktail, index) => (
            <div className="cocktail-card" key={index}>
              <img src={cocktail.image} alt={cocktail.name} />
              <h3 title={cocktail.name}>{cocktail.name}</h3>
              <button className="remove-btn">Remove</button>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
};

export default FavoriteCocktails;


















































/* FRån början */

/* import { useFavorites } from '../context/FavoritesContext';

const Favorites = () => {
  const { favorites, removeFavorite } = useFavorites(); // Hämta favoriter och removeFavorite från Context
  console.log('Favorites:', favorites);
  
  return (
    <div className="container">
      <h1>Favorites</h1> */

{
  /* Visa meddelande om inga favoriter finns */
}
/*  {favorites.length === 0 ? (
        <p>Du har inga sparade favoriter</p>
      ) : (
        <div className="grid">
          {favorites.map((drink, index) => (
            <div key={index} className="card">
              <img src={drink.imgUrl} alt={drink.name} />
              <h2>{drink.name}</h2>
              <button onClick={() => removeFavorite(drink.name)}>Remove</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;

 */
