import '../styles/Navbar.css';
import { Link, useNavigate } from 'react-router-dom';
import React, { useState, useRef, useEffect } from 'react';
import FavoriteButton from './FavoriteButton'; // Import the FavoriteButton component

const Navbar: React.FC = () => {

  const [searchTerm, setSearchTerm] = useState<string>("");
  const searchValue = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (searchValue.current) {
      searchValue.current.focus();
    }
  }, []);

  const searchCocktail = () => {
    if (searchValue.current) {
      setSearchTerm(searchValue.current.value);
    }
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (searchTerm.trim() === '') return;

    // Navigate to Search page with search term as a query param
    navigate(`/search?query=${searchTerm}`);
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">
        The CocktailDB
      </Link>
      <ul className="navbar-list">
        <li>
          <Link to="/favorites" className="navbar-link favorite-link">
            Favorites
            <FavoriteButton drinkName="" drinkImgUrl="" /> {/* Add the FavoriteButton component */}
          </Link>
        </li>
        <li>
          <form className="search-form" onSubmit={handleSubmit}>
            <input
              type="text"
              placeholder="Search..."
              className="search-input"
              onChange={searchCocktail}
              ref={searchValue}
              value={searchTerm}
            />
          </form>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
