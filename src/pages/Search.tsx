import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../styles/Search.css";

export function Search() {
  const [cocktails, setCocktails] = useState<any[]>([]);
  const [displayedCocktails, setDisplayedCocktails] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [cocktailsPerPage] = useState<number>(10);
  const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const location = useLocation();
  const query = new URLSearchParams(location.search).get("query");
  const Navigate = useNavigate(); // direct to another page

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
          console.error("Error fetching data from TheCocktailDB API:", error);
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
                <button onClick={() => Navigate("/DrinkInfo")} className="search-btn-card">
                  See more
                </button>
              </aside>
            ))
          ) : searchPerformed ? (
            <p>No results found for "{query}". Try a different search.</p>
          ) : (
            <p>Search for your favorite cocktails.</p>
          )}
        </section>
      )}

      {/* Pagination Controls */}
      <div className="pagination">
        <button onClick={handlePrevPage} disabled={currentPage === 1}>
          Previous
        </button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <button onClick={handleNextPage} disabled={currentPage === totalPages}>
          Next
        </button>
      </div>
    </main>
  );
}
