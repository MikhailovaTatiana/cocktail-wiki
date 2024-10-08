import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import "../styles/DrinkInfo.css";
import FavoriteButton from "../components/FavoriteButton"; // Importera FavoriteButton-komponenten
import { Cocktail } from "../interfaces";
import Footer from "../components/Footer";

const CocktailDetails = () => {
    const { id } = useParams<{ id: string }>(); // get cocktail id
    const [cocktail, setCocktail] = useState<Cocktail | null>(null);
    const Navigate = useNavigate();

    useEffect(() => {
        // fetch cocktail details by id
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(data.drinks[0]);
            });
    }, [id]);

    useEffect(() => {
        // fetch cocktail details by name
        fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${id}`)
            .then((response) => response.json())
            .then((data) => {
                setCocktail(data.drinks[0]);
            });
    }, [id]);

    if (!cocktail) return <p>Erorr loading api</p>;

    return (
        <main className="info-main">
            <h1 className="info-header">Drink Information</h1>
            <section className="info-card">
                <aside className="info-aside info-left">
                    <h1 className="drink-header" title={cocktail.strDrink}>
                        {cocktail.strDrink}
                    </h1>
                    <img
                        className="info-img"
                        src={cocktail.strDrinkThumb}
                        alt={cocktail.strDrink}
                    />
                    <h4>
                        Category:{" "}
                        <span className="special">{cocktail.strCategory}</span>
                    </h4>
                    <h4>
                        Type:{" "}
                        <span className="special">{cocktail.strAlcoholic}</span>
                    </h4>
                    <h4>
                        Glass:{" "}
                        <span className="special">{cocktail.strGlass}</span>
                    </h4>
                </aside>

                <aside className="info-aside info-right">
                    <div className="star">
                        <FavoriteButton
                            drinkName={cocktail.strDrink} // Skickar drinkens namn som prop
                            drinkImgUrl={cocktail.strDrinkThumb} // Skickar drinkens bild-URL som prop
                        />
                    </div>
                    <section className="ingredient-container">
                        <h1 className="ingredient-header">Ingredients</h1>
                        <ul className="scroll-ingr">
                            <li>
                                {cocktail.strMeasure1 || ""}&ensp;
                                <Link
                                    to={`/ingredient/${cocktail.strIngredient1}`}
                                >
                                    <span className="ingredient">
                                        {cocktail.strIngredient1 || ""}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                {cocktail.strMeasure2 || ""}&ensp;
                                <Link
                                    to={`/ingredient/${cocktail.strIngredient2}`}
                                >
                                    <span className="ingredient">
                                        {cocktail.strIngredient2 || ""}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                {cocktail.strMeasure3 || ""}&ensp;
                                <Link
                                    to={`/ingredient/${cocktail.strIngredient3}`}
                                >
                                    <span className="ingredient">
                                        {cocktail.strIngredient3 || ""}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                {cocktail.strMeasure4 || ""}&ensp;
                                <Link
                                    to={`/ingredient/${cocktail.strIngredient4}`}
                                >
                                    <span className="ingredient">
                                        {cocktail.strIngredient4 || ""}
                                    </span>
                                </Link>
                            </li>
                            <li>
                                {cocktail.strMeasure5 || ""}&ensp;
                                <Link
                                    to={`/ingredient/${cocktail.strIngredient5}`}
                                >
                                    <span className="ingredient">
                                        {cocktail.strIngredient5 || ""}
                                    </span>
                                </Link>
                            </li>
                        </ul>
                    </section>
                    <section className="instructions-container">
                        <h1 className="instructions-header">Instructions</h1>
                        <p className="scroll-instr">
                            {cocktail.strInstructions}
                        </p>
                    </section>
                    <button onClick={() => Navigate(-1)} className="goback-btn">
                        Go back
                    </button>
                </aside>
            </section>
            <Footer />
        </main>
    );
};

export default CocktailDetails;
