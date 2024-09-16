import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DrinkInfo.css";

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
  const { id } = useParams<{ id: string }>(); // get cocktail id
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);
  const Navigate = useNavigate();

  useEffect(() => {
    // fetch cocktail details by ID
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`)
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
        <aside className="info-aside info-right">
          <h1 className="drink-header">{cocktail.strDrink}</h1>
          <img className="info-img" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <p>Category: {cocktail.strCategory}</p>
          <p>Type: {cocktail.strAlcoholic}</p>
          <p>Glass: {cocktail.strGlass}</p>
        </aside>
        <aside className="info-aside info-left">
          <section className="ingredient-container">
            <h1 className="ingredient-header">Ingredients</h1>
            <ul>
              <li>
                {cocktail.strMeasure1 || ""}
                {cocktail.strIngredient1 || ""}
              </li>
              <li>
                {cocktail.strMeasure2 || ""}
                {cocktail.strIngredient2 || ""}
              </li>
              <li>
                {cocktail.strMeasure3 || ""}
                {cocktail.strIngredient3 || ""}
              </li>
              <li>
                {cocktail.strMeasure4 || ""}
                {cocktail.strIngredient4 || ""}
              </li>
              <li>
                {cocktail.strMeasure5 || ""}
                {cocktail.strIngredient5 || ""}
              </li>
            </ul>
          </section>
          <section className="instructions-container">
            <h1 className="instructions-header">Instructions</h1>
            <p>{cocktail.strInstructions}</p>
          </section>
          <button onClick={() => Navigate(-1)} className="goback-btn">
            Go back
          </button>
        </aside>
      </section>
    </main>
  );
};

export default CocktailDetails;
