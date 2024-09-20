// import starIcon from '../assets/icons8-star-50.png';
import { useState, useEffect } from "react";
import "../styles/Search.css";
import LeftArrowIcon from "../assets/left-arrow.png";
import RightArrowIcon from "../assets/right-arrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from '../components/FavoriteButton'; // Import the FavoriteButton component

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
  console.log("totalPages", totalPages);

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

  const shouldShowPagination = searchPerformed && cocktails.length > 0 && totalPages > 0;

  return (
    <main className="search-main">
      <h1 className="search-header">Search Results for "{query}"</h1>
      {shouldShowPagination && (
        <div className="pagination-container">
          <div className="arrow-placeholder">
            {currentPage > 1 && (
              <button className="arrow-btn" onClick={handlePrevPage}>
                <img src={LeftArrowIcon} alt="Previous Page" />
              </button>
            )}
          </div>
          <span className="pages">
            <p>
              {" "}
              Page {currentPage} of {totalPages}
            </p>
          </span>
          <div className="arrow-placeholder">
            {currentPage < totalPages && (
              <button className="arrow-btn" onClick={handleNextPage}>
                <img src={RightArrowIcon} alt="Next Page" />
              </button>
            )}
          </div>
        </div>
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
                  {/* <img className="star-img" src={starIcon} alt="star" /> */}
                  <FavoriteButton
                    drinkName={cocktail.strDrink}
                    drinkImgUrl={cocktail.strDrinkThumb}
                  />
                </div>
                <h2>{cocktail.strDrink}</h2>
                <button
                  onClick={() => Navigate(`/cocktail/${cocktail.idDrink}`)}
                  className="search-btn-card"
                >
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
    </main>
  );
}
