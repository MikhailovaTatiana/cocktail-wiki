import { useState, useEffect } from "react";
import "../styles/Search.css";
import LeftArrowIcon from "../assets/left-arrow.png";
import RightArrowIcon from "../assets/right-arrow.png";
import { useLocation, useNavigate } from "react-router-dom";
import FavoriteButton from "../components/FavoriteButton";

export function Search() {
    const [cocktails, setCocktails] = useState<any[]>([]);
    const [displayedCocktails, setDisplayedCocktails] = useState<any[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [cocktailsPerPage] = useState<number>(10);
    const [searchPerformed, setSearchPerformed] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const location = useLocation();
    const query = new URLSearchParams(location.search).get("query");
    const navigate = useNavigate();

    const [categories, setCategories] = useState<any[]>([]);
    const [glasses, setGlasses] = useState<any[]>([]);
    const [alcoholTypes, setAlcoholTypes] = useState<any[]>([]);
    const [selectedFilter, setSelectedFilter] = useState<string>("");

    // Hämta sparade data från localStorage när komponenten laddas
    useEffect(() => {
        const savedData = localStorage.getItem("cocktailSearchData");
        if (savedData) {
            const { cocktails, currentPage, selectedFilter } =
                JSON.parse(savedData);
            setCocktails(cocktails);
            setDisplayedCocktails(cocktails.slice(0, cocktailsPerPage));
            setCurrentPage(currentPage);
            setSelectedFilter(selectedFilter);
            setSearchPerformed(true);

            // Om det finns ett aktivt filter, hämta cocktails baserat på det
            if (selectedFilter) {
                fetchCocktails(selectedFilter); // Hämta cocktails med det valda filtret
            }
        }
    }, []);

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
                        setCurrentPage(1);
                        // Spara i localStorage
                        localStorage.setItem(
                            "cocktailSearchData",
                            JSON.stringify({
                                cocktails: data.drinks,
                                currentPage: 1,
                                selectedFilter: "", // Ingen filter
                            })
                        );
                    } else {
                        setCocktails([]);
                    }
                } catch (error) {
                    console.error(
                        "Error fetching data from TheCocktailDB API:",
                        error
                    );
                } finally {
                    setLoading(false);
                }
            };
            if (query) {
                fetchCocktails();
            }
        }
    }, [query]);

    // Hämta filterkategorier
    useEffect(() => {
        const fetchFilters = async () => {
            const categoriesRes = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list"
            );
            const glassesRes = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/list.php?g=list"
            );
            const alcoholTypesRes = await fetch(
                "https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list"
            );

            const categoriesData = await categoriesRes.json();
            const glassesData = await glassesRes.json();
            const alcoholTypesData = await alcoholTypesRes.json();

            setCategories(categoriesData.drinks);
            setGlasses(glassesData.drinks);
            setAlcoholTypes(alcoholTypesData.drinks);
        };
        fetchFilters();
    }, []);

    // Hämta cocktails baserat på filter
    const fetchCocktails = async (filter = "") => {
        setLoading(true);
        let url = `https://www.thecocktaildb.com/api/json/v1/1/filter.php?`;

        if (filter.startsWith("Alcoholic:")) {
            url += `a=${filter.replace("Alcoholic: ", "")}&`;
        } else if (filter.startsWith("Category:")) {
            url += `c=${filter.replace("Category: ", "")}&`;
        } else if (filter.startsWith("Glass:")) {
            url += `g=${filter.replace("Glass: ", "")}&`;
        }

        try {
            const response = await fetch(url);
            const data = await response.json();
            setSearchPerformed(true);
            if (data.drinks) {
                setCocktails(data.drinks);
                setCurrentPage(1);
                // Spara cocktails och filter i localStorage
                localStorage.setItem(
                    "cocktailSearchData",
                    JSON.stringify({
                        cocktails: data.drinks,
                        currentPage: 1,
                        selectedFilter: filter, // Spara aktuellt filter
                    })
                );
            } else {
                setCocktails([]);
            }
        } catch (error) {
            console.error("Error fetching data from TheCocktailDB API:", error);
        } finally {
            setLoading(false);
        }
    };

    // Hämta cocktails när sökfråga eller filter ändras
    useEffect(() => {
        if (selectedFilter) {
            fetchCocktails(selectedFilter); // Använd selectedFilter för att hämta cocktails
        }
    }, [selectedFilter]);

    // Uppdatera visade cocktails baserat på nuvarande sida
    useEffect(() => {
        const indexOfLastCocktail = currentPage * cocktailsPerPage;
        const indexOfFirstCocktail = indexOfLastCocktail - cocktailsPerPage;
        setDisplayedCocktails(
            cocktails.slice(indexOfFirstCocktail, indexOfLastCocktail)
        );
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

    const shouldShowPagination =
        searchPerformed && cocktails.length > 0 && totalPages > 0;

    return (
        <main className="search-main">
            <h1 className="search-header">
                Search Results for "
                {selectedFilter
                    ? selectedFilter.replace(
                          /^(Alcoholic: | Category: | Glass: )/,
                          ""
                      )
                    : query}
                "
            </h1>
            {/* Filtersektion */}
            <div className="filter-container">
                <label>
                    Filter by:{" "}
                    <select
                        value={selectedFilter}
                        onChange={(e) => {
                            const newFilter = e.target.value;
                            setSelectedFilter(newFilter); // Uppdatera valt filter
                            // Återställ cocktails när ett filter väljs
                            if (newFilter) {
                                fetchCocktails(newFilter); // Hämta cocktails med valt filter
                            } else {
                                setCocktails([]); // Om inget filter, rensa cocktails
                            }
                        }}
                    >
                        <option value="">Choose a filter</option>
                        <optgroup label="Alcohol Type">
                            {alcoholTypes.map((type) => (
                                <option
                                    key={type.strAlcoholic}
                                    value={`Alcoholic: ${type.strAlcoholic}`}
                                >
                                    {type.strAlcoholic}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Category">
                            {categories.map((cat) => (
                                <option
                                    key={cat.strCategory}
                                    value={`Category: ${cat.strCategory}`}
                                >
                                    {cat.strCategory}
                                </option>
                            ))}
                        </optgroup>
                        <optgroup label="Glass Type">
                            {glasses.map((glass) => (
                                <option
                                    key={glass.strGlass}
                                    value={`Glass: ${glass.strGlass}`}
                                >
                                    {glass.strGlass}
                                </option>
                            ))}
                        </optgroup>
                    </select>
                </label>
            </div>
            {/* Paginering */}
            {shouldShowPagination && (
                <div className="search-pagination">
                    {currentPage > 1 && (
                        <button className="arrow-btn" onClick={handlePrevPage}>
                            <img src={LeftArrowIcon} alt="Previous Page" />
                        </button>
                    )}
                    <span className="pages">
                        Page {currentPage} of {totalPages}
                    </span>
                    {currentPage < totalPages && (
                        <button className="arrow-btn" onClick={handleNextPage}>
                            <img src={RightArrowIcon} alt="Next Page" />
                        </button>
                    )}
                </div>
            )}
            {loading ? (
                <p>Loading...</p>
            ) : (
                <section className="result-cards">
                    {displayedCocktails.length > 0 ? (
                        displayedCocktails.map((cocktail) => (
                            <aside
                                className="search-card"
                                key={cocktail.idDrink}
                            >
                                <div className="images">
                                    <img
                                        className="drink-img"
                                        src={cocktail.strDrinkThumb}
                                        alt={cocktail.strDrink}
                                    />
                                    <FavoriteButton
                                        drinkName={cocktail.strDrink}
                                        drinkImgUrl={cocktail.strDrinkThumb}
                                    />
                                </div>
                                <h2>{cocktail.strDrink}</h2>
                                <button
                                    onClick={() =>
                                        navigate(
                                            `/cocktail/${cocktail.idDrink}`
                                        )
                                    }
                                    className="search-btn-card"
                                >
                                    See more
                                </button>
                            </aside>
                        ))
                    ) : searchPerformed ? (
                        <p>
                            No results found for "{query}". Try a different
                            search.
                        </p>
                    ) : (
                        <p>Search for your favorite cocktails.</p>
                    )}
                </section>
            )}
        </main>
    );
}
