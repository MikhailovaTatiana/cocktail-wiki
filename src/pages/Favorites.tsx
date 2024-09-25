import "../styles/Favorites.css";  
import { useFavorites } from "../context/FavoritesContext";
import LeftArrowIcon from "../assets/left-arrow.png";
import RightArrowIcon from "../assets/right-arrow.png";
import FavoriteAnimation from '../assets/FavoriteAnimation.json';
import { Player } from '@lottiefiles/react-lottie-player';
import { useNavigate } from "react-router-dom";

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites(); // Get favorites and removeFavorite from Context
    const navigate = useNavigate(); // Navigation functionality

    return (
        <main className="main-favorites">
            <h1 className="header">Favorites</h1>
            <button onClick={() => navigate(-1)} className="goback-btn">
                Go back
            </button>

            <div className="content-container">
                {/* Show message if no favorites exist */}
                {favorites.length === 0 ? (
                    <div className="emptyMessageContainer">
                        <p className="emptyMessage">You have no saved favorites...</p>
                        <Player
                            autoplay
                            loop
                            src={FavoriteAnimation} // Animation JSON file
                            style={{ height: '300px', width: '300px' }} // Adjust size as needed
                        />
                    </div>
                ) : (
                    <>
                        <div className="pagination-container">
                            <div className="arrow-placeholder">
                                <button className="arrow-btn" disabled>
                                    <img src={LeftArrowIcon} alt="Previous Page" />
                                </button>
                            </div>
                            <span className="pages">Page 1 of 3</span>
                            <div className="arrow-placeholder">
                                <button className="arrow-btn" disabled>
                                    <img src={RightArrowIcon} alt="Next Page" />
                                </button>
                            </div>
                        </div>
                        <div className="cocktail-grid">
                            {favorites.map((cocktail, index) => (
                                <div className="cocktail-card" key={index}>
                                    <img src={cocktail.imgUrl} alt={cocktail.name} />
                                    <h3 title={cocktail.name}>{cocktail.name}</h3>
                                    <button className="remove-btn" onClick={() => removeFavorite(cocktail.name)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                    </>
                )}
            </div>
        </main>
    );
};

export default Favorites;



