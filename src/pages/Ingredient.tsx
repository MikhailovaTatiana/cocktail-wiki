import { useParams } from "react-router-dom";
import "../styles/Ingredient.css";
import { useEffect, useState } from "react";

interface IngredientDetail {
  idIngredient: string;
  strIngredient: string;
  strDescription: string;
}

interface Drink {
  idDrink: string;
  strDrink: string;
  strDrinkThumb: string;
}

export function Ingredient() {
  const { ingredientName } = useParams<{ ingredientName: string }>();
  const [ingredient, setIngredient] = useState<IngredientDetail | null>(null);
  const [drinks, setDrinks] = useState<Drink[]>([]);

  // Fetch ingredient details
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ingredients && data.ingredients.length > 0) {
          setIngredient(data.ingredients[0]);
        }
      });
  }, [ingredientName]);

  // Fetch drinks with the ingredient
  useEffect(() => {
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.drinks) {
          setDrinks(data.drinks);
        }
      });
  }, [ingredientName]);

  if (!ingredient) return <p>Loading ingredient details...</p>;

  return (
    <main className="ingredient-main">
      <h1 className="ing-header">Ingredient</h1>
      <section className="ingredient-card">
        <aside className="ingredient-aside ingredient-right">
          <h1 className="ingredient-header">{ingredient.strIngredient}</h1>
          <img
            className="ingredient-image"
            src={`https://www.thecocktaildb.com/images/ingredients/${ingredient.strIngredient}-Medium.png`}
            alt={ingredient.strIngredient}
          />
        </aside>
        <aside className="ingredient-aside ingredient-left">
          <section className="ingredient-container">
            <h1 className="description-header">Description</h1>
            <p className="description-text">
              {ingredient.strDescription ? ingredient.strDescription : "No description."}
            </p>
          </section>
        </aside>
        {/* grid drinks */}
        <h1 className="drinks-header-grid">Drinks</h1>
        <section className="grid-drinks">
          {drinks.length > 0 ? (
            drinks.map((drink) => (
              <article className="drink-card">
                <img className="drink-image" src={drink.strDrinkThumb} alt={drink.strDrink} />
                <p className="drink-card-name">{drink.strDrink}</p>
              </article>
            ))
          ) : (
            <p>No drinks found.</p>
          )}
        </section>
      </section>
    </main>
  );
}

export default Ingredient;
