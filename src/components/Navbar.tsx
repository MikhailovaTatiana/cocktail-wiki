import "../styles/Navbar.css";
import starIcon from '../assets/icons8-star-50.png'
import { Link } from 'react-router-dom';
import React, { useState, useRef, useEffect } from "react";

const Navbar: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [cocktails, setCocktails] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false); // New state to track search

  const cocktailsPerPage = 10;
  const searchValue = useRef<HTMLInputElement>(null);

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

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (searchTerm.trim() === "") return;

    try {
      const response = await fetch(
        `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${searchTerm}`
      );
      const data = await response.json();

      setSearchPerformed(true); // Set to true when a search is performed

      if (data.drinks) {
        setCocktails(data.drinks);
      } else {
        setCocktails([]);
      }

      setCurrentPage(1);
    } catch (error) {
      console.error("Error fetching data from TheCocktailDB API:", error);
    }
  };

  const indexOfLastCocktail = currentPage * cocktailsPerPage;
  const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
  const currentCocktails = cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail);

  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <nav className="navbar">
      <Link to="/" className="navbar-brand">The CocktailDB</Link>
      <ul className="navbar-list">
      <li>
      <Link to="/favorites" className="navbar-link favorite-link">
          Favorites <img src={starIcon} alt="Star" className="star-icon" />
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

      <section className="search-results">
        {currentCocktails.length > 0 ? (
          <>
            <ul>
              {currentCocktails.map((cocktail) => (
                <li key={cocktail.idDrink}>
                  <p>{cocktail.strDrink}</p>
                  <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} width="100" />
                </li>
              ))}
            </ul>

            <div className="pagination">
              <button onClick={prevPage} disabled={currentPage === 1}>
                Previous
              </button>
              <span>
                Page {currentPage} of {totalPages}
              </span>
              <button onClick={nextPage} disabled={currentPage === totalPages}>
                Next
              </button>
            </div>
          </>
        ) : searchPerformed && (
          <p>No cocktails found. Try searching for something else!</p>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
