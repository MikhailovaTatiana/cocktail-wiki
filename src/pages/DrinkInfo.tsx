import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../styles/DrinkInfo.css";
import starIcon from '../assets/icons8-star-50.png';
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
        <aside className="info-aside info-left">
          <h1 className="drink-header" title={cocktail.strDrink}>{cocktail.strDrink}</h1>
          <img className="info-img" src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
          <h4>Category: <span className="special">{cocktail.strCategory}</span></h4>
          <h4>Type: <span className="special">{cocktail.strAlcoholic}</span></h4>
          <h4>Glass: <span className="special">{cocktail.strGlass}</span></h4>
        </aside>

        <aside className="info-aside info-right">
          <img className="star-in-info" src={starIcon} alt="star" />

          <section className="ingredient-container">
            <h1 className="ingredient-header">Ingredients</h1>
            <ul className="scroll-ingr">
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
            <p className="scroll-instr">{cocktail.strInstructions}</p>
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
