import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import "../styles/FavoriteButton.css";

interface FavoriteButtonProps {
  drinkName?: string; // Optional, for Navbar case
  drinkImgUrl?: string; // Optional, for Navbar case
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ drinkName, drinkImgUrl }) => {
  const { favorites, setFavorites } = useFavorites();
  const navigate = useNavigate(); // For navigation

  // Check if the drink is already in favorites
  const isFavorite = drinkName && favorites.some((drink) => drink.name === drinkName);

  const handleClick = () => {
    if (drinkName && drinkImgUrl) {
      // Handle adding/removing favorites if drinkName and drinkImgUrl are provided
      if (isFavorite) {
        setFavorites(favorites.filter((drink) => drink.name !== drinkName));
      } else {
        setFavorites([...favorites, { name: drinkName, imgUrl: drinkImgUrl }]);
      }
    } else {
      // Redirect to the Favorites page if no drinkName and drinkImgUrl are provided
      navigate('/favorites');
    }
  };

  return (
    <button className="favorite-button" onClick={handleClick}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        className={isFavorite ? 'star-icon active' : 'star-icon'}
      >
        <path d="M12 17.27L18.18 21 16.54 14.62 22 10.27 15.81 9.63 12 3 8.19 9.63 2 10.27 7.46 14.62 5.82 21 12 17.27z" />
      </svg>
    </button>
  );
};

export default FavoriteButton;
