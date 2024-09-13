import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/Search.css';
import LeftArrowIcon from '../assets/left-arrow.png';
import RightArrowIcon from '../assets/right-arrow.png';

export function Search() {
  const [cocktails, setCocktails] = useState<any[]>([]);
  const [displayedCocktails, setDisplayedCocktails] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cocktailsPerPage] = useState<number>(10);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get('query');

  useEffect(() => {
    if (query) {
      const fetchCocktails = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${query}`
          );
          const data = await response.json();

          setSearchPerformed(true);
          if (data.drinks) {
            setCocktails(data.drinks);
            setCurrentPage(1); // Reset to page 1 on new search
          } else {
            setCocktails([]);
          }
        } catch (error) {
          console.error('Error fetching data from TheCocktailDB API:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchCocktails();
    }
  }, [query]);

  useEffect(() => {
    // Update displayedCocktails whenever cocktails or currentPage changes
    const indexOfLastCocktail = currentPage * cocktailsPerPage;
    const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
    setDisplayedCocktails(cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail));
  }, [cocktails, currentPage]);

  const totalPages = Math.ceil(cocktails.length / cocktailsPerPage);
  console.log('totalPages', totalPages);

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const handlePrevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return (
    <main className="search-main">
      <h1 className="search-header">Search Results for "{query}"</h1>
      <div className="pagination-arrows">
      {currentPage > 1 && (
          <button className='arrow-btn' onClick={handlePrevPage} /* disabled={currentPage === 1} */>
            <img src={LeftArrowIcon} alt="Previous Page" />
          </button>
        )}
      {loading ? (
        <p>Loading...</p>
      ) : (
        <section className="result-cards">
          {displayedCocktails.length > 0 ? (
            displayedCocktails.map((cocktail) => (
              <aside className="search-card" key={cocktail.idDrink}>
                <div className="images">
                  <img className="drink-img" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
                  <img className="star-img" src="src/assets/icon-star.svg" alt="star" />
                </div>
                <h2>{cocktail.strDrink}</h2>
                <button className="search-btn-card">See more</button>
              </aside>
            ))
          ) : searchPerformed ? (
            <p>No results found for "{query}". Try a different search.</p>
          ) : (
            <p>Search for your favorite cocktails.</p>
          )}
        </section>
        
      )}{currentPage < totalPages && (
          <button className='arrow-btn' onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={RightArrowIcon}  alt="Next Page" />
          </button>
        )}
      </div>



      {/* Pagination Controls */}

      <div className="pagination">
       
        <span>
          Page {currentPage} of {totalPages}
        </span>
       
      </div>
    </main>
  );
}
