import "../styles/Navbar.css";
import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import FavoriteButton from "./FavoriteButton";

const Navbar: React.FC = () => {
    const [searchTerm, setSearchTerm] = useState<string>("");
    const [placeholder, setPlaceholder] = useState<string>("🔎");
    const searchValue = useRef<HTMLInputElement>(null);
    const navigate = useNavigate(); // Using useNavigate hook for navigation

    const searchCocktail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);

        if (event.target.value.length > 0) {
            setPlaceholder("");
        } else {
            setPlaceholder("🔎");
        }
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (searchTerm.trim() === "") return;

        // Navigate to Search page with search term as a query param
        navigate(`/search?query=${searchTerm}`);

        // Clear input after search
        setSearchTerm("");
        setPlaceholder("🔎");

        // Force a page refresh after search with filters
        setTimeout(() => {
            window.location.reload();
        }, 100); // Add a small delay

        if (searchValue.current) {
            searchValue.current.blur(); // Programmatically blur the input
        }
    };

    const handleFocus = () => {
        setPlaceholder("");
    };

    // Rensa localStorage vid navigation till tom söksidan
    const handleBlur = () => {
        if (searchTerm === "") {
            setPlaceholder("🔎");
        }
    };

    const handleSearchClick = () => {
        localStorage.clear();
        navigate("/search");
        window.location.reload();
    };

    return (
        <nav className="navbar">
            <Link to="/" className="navbar-brand">
                The CocktailDB
            </Link>
            <ul className="navbar-list">
                <li>
                    <Link to="/favorites" className="navbar-link favorite-link">
                        Favorites <FavoriteButton drinkName="" drinkImgUrl="" />
                        {/* Add the FavoriteButton component */}
                    </Link>
                </li>
                <li>
                    <form className="search-form" onSubmit={handleSubmit}>
                        <Link
                            to={"search"}
                            className="search-form"
                            onClick={handleSearchClick}
                        >
                            Search{" "}
                        </Link>
                        <input
                            type="text"
                            placeholder={placeholder}
                            className="search-input"
                            onChange={searchCocktail}
                            ref={searchValue}
                            value={searchTerm}
                            onFocus={handleFocus}
                            onBlur={handleBlur}
                        />
                    </form>
                </li>
            </ul>
        </nav>
    );
};

export default Navbar;
