import React from "react";
import "../styles/Favorites.css";
import { useFavorites } from "../context/FavoritesContext";

const Favorites = () => {
    const { favorites, removeFavorite } = useFavorites(); // Hämta favoriter och removeFavorite från Context

    return (
        <main className="favorites-main">
            <h1 className="fav-header">Favorites</h1>
            {/* Visa meddelande om inga favoriter finns */}
            {favorites.length === 0 ? (
                <p className="empty">Du har inga sparade favoriter</p>
            ) : (
                <div className="grid">
                    {favorites.map((drink, index) => (
                        <div key={index} className="card">
                            <img src={drink.imgUrl} alt={drink.name} />
                            <h2>{drink.name}</h2>
                            <button onClick={() => removeFavorite(drink.name)}>
                                Remove
                            </button>
                        </div>
                    ))}
                </div>
            )}
        </main>
    );
};

export default Favorites;
