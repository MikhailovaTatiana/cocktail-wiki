import { useParams } from "react-router-dom";
import "../styles/Ingredient.css";
import { useEffect, useState } from "react";

interface IngredientDetail {
  idIngredient: string; // id/namn
  strIngredient: string; // ingredient
  strDrinkThumb: string; // bild
}

export function Ingredient() {
  const { ingredientName } = useParams<{ ingredientName: string }>();
  const [ingredient, setIngredient] = useState<IngredientDetail | null>(null);

  useEffect(() => {
    // Fetch ingredient details
    fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?i=${ingredientName}`)
      .then((response) => response.json())
      .then((data) => {
        if (data.ingredients && data.ingredients.length > 0) {
          setIngredient(data.ingredients[0]); // first ingredient found
        }
      });
  }, [ingredientName]);

  if (!ingredient) return <p>Loading ingredient details...</p>;

  return (
    <main className="ingredient-main">
      <h1 className="ing-header">Ingredient</h1>
      <section className="ingredient-card">
        <aside className="ingredient-aside ingredient-right">
          <h1 className="ingredient-header">{ingredientName}</h1>
          <img className="ingredient-image" src={`/src/assets/lime.png`} />
        </aside>
        <aside className="ingredient-aside ingredient-left">
          <section className="ingredient-container">
            <h1 className="description-header">Description</h1>
            <p className="description-text">
              A lime (from French lime, from Arabic līma, from Persian līmū, "lemon") is a hybrid
              citrus fruit, which is typically round, lime green, 3–6 centimetres (1.2–2.4 in) in
              diameter, and contains acidic juice vesicles. There are several species of citrus
              trees whose fruits are called limes, including the Key lime (Citrus aurantifolia),
              Persian lime, kaffir lime, and desert lime. Limes are an excellent source of vitamin
              C, and are often used to accent the flavours of foods and beverages. They are grown
              year-round. Plants with fruit called "limes" have diverse genetic origins; limes do
              not form a monophyletic group.
            </p>
          </section>
        </aside>
        {/* grid for drink cards */}
        <h1 className="drinks-header-grid">Drinks</h1>
        <section className="grid-drinks">
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Aperol Spritz</p>
          </article>
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Margarita</p>
          </article>
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Mojito</p>
          </article>
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Pina Colada</p>
          </article>
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Old Fashioned</p>
          </article>
          <article className="drink-card">
            <img
              className="drink-image"
              src={`/src/assets/test-img-drink.png`}
              alt="Aperol Spritz"
            />
            <p>Whiskey Sour</p>
          </article>
        </section>
      </section>
    </main>
  );
}

export default Ingredient;
