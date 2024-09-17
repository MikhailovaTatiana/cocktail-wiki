import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useFavorites } from '../context/FavoritesContext';
import starIcon from '../assets/icons8-star-50.png'; // Adjust path as needed

interface FavoriteButtonProps {
  drinkName: string;
  drinkImgUrl: string;
}

const FavoriteButton: React.FC<FavoriteButtonProps> = ({ drinkName, drinkImgUrl }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { favorites, setFavorites } = useFavorites();

  const isFavorite = favorites.includes(drinkName);

  const handleClick = () => {
    if (location.pathname === '/search') {
      // On the Search page: add/remove favorite
      if (isFavorite) {
        setFavorites(favorites.filter(name => name !== drinkName));
      } else {
        setFavorites([...favorites, drinkName]);
      }
    } else if (location.pathname === '/') {
      // On the Navbar: redirect to Favorites page
      navigate('/favorites');
    }
  };

  return (
    <button className="favorite-button" onClick={handleClick}>
      <img src={starIcon} alt="Favorite" className={isFavorite ? 'star-icon active' : 'star-icon'} />
    </button>
  );
};

export default FavoriteButton;
