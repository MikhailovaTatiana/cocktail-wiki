import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DrinkInfo.css";
import FavoriteButton from "../components/FavoriteButton"; // Importera FavoriteButton-komponenten

interface Cocktail {
  idDrink: string; // id
  strDrink: string; // namn
  strDrinkThumb: string; // bild
  strCategory: string; // kategori
  strAlcoholic: string; // alkohol
  strTags: string; // taggar
  strInstructions: string; // instruktion
  strIngredient1: string; // ingrediens
  strIngredient2: string;
  strIngredient3: string;
  strIngredient4: string;
  strIngredient5: string;
  strMeasure1: string; // mått
  strMeasure2: string;
  strMeasure3: string;
  strMeasure4: string;
  strMeasure5: string;
  strGlass: string; // glas
}

const CocktailDetails = () => {
  const { id } = useParams<{ id: string }>(); // Hämta cocktail-id från URL-parametrar
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const navigate = useNavigate(); // Ändrat från `Navigate` till `navigate` i camelCase

  useEffect(() => {
    // Hämta cocktaildetaljer med ID
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
      .then((response) => response.json())
      .then((data) => {
        setCocktail(data.drinks[0]); // Uppdatera state med cocktaildata
      });
  }, [id]);

  if (!cocktail) return <p>Error loading API</p>; // Hantera fallet om cocktail inte finns

  return (
    <main className="info-main">
      <h1 className="info-header">Drink Information</h1>
      <section className="info-card">
        <aside className="info-aside info-right">
          <h1 className="drink-header">{cocktail.strDrink}</h1>
          <img className="info-img" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>Category: {cocktail.strCategory}</p>
          <p>Type: {cocktail.strAlcoholic}</p>
          <p>Glass: {cocktail.strGlass}</p>
        </aside>
        <aside className="info-aside info-left">
          {/* Ersatt hårdkodad stjärn-ikon med FavoriteButton-komponenten */}
          <FavoriteButton
            drinkName={cocktail.strDrink} // Skickar drinkens namn som prop
            drinkImgUrl={cocktail.strDrinkThumb} // Skickar drinkens bild-URL som prop
          />
          <section className="ingredient-container">
            <h1 className="ingredient-header">Ingredients</h1>
            <ul>
              <li>
                {cocktail.strMeasure1 || ""} 
                <span className="ingredient">{cocktail.strIngredient1 || ""}</span>
              </li>
              <li>
                {cocktail.strMeasure2 || ""} 
                <span className="ingredient">{cocktail.strIngredient2 || ""}</span>
              </li>
              <li>
                {cocktail.strMeasure3 || ""} 
                <span className="ingredient">{cocktail.strIngredient3 || ""}</span>
              </li>
              <li>
                {cocktail.strMeasure4 || ""} 
                <span className="ingredient">{cocktail.strIngredient4 || ""}</span>
              </li>
              <li>
                {cocktail.strMeasure5 || ""} 
                <span className="ingredient">{cocktail.strIngredient5 || ""}</span>
              </li>
            </ul>
          </section>
          <section className="instructions-container">
            <h1 className="instructions-header">Instructions</h1>
            <p>{cocktail.strInstructions}</p>
          </section>
          <button onClick={() => navigate(-1)} className="goback-btn">
            Go back
          </button>
        </aside>
      </section>
    </main>
  );
};

export default CocktailDetails;

