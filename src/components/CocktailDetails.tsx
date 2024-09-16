import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

interface Cocktail {
  idDrink: string; // id
  strDrink: string; // namn
  strDrinkThumb: string; // bild
  strInstructions: string; // instruktioner
  strCategory: string; // kategori
  strAlcoholic: string; // alkohol
  strTags: string; // taggar
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

const CocktailDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>(); // get cocktail id
  const [cocktail, setCocktail] = useState<Cocktail | null>(null);

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
    <section>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <p>Category: {cocktail.strCategory}</p>
      <p>Type: {cocktail.strAlcoholic}</p>
      <p>Glass: {cocktail.strGlass}</p>
      <h1>List of ingredients:</h1>
      <ul>
        <li>
          {cocktail.strMeasure1}
          {cocktail.strIngredient1}
        </li>
        <li>
          {cocktail.strMeasure2}
          {cocktail.strIngredient2}
        </li>
        <li>
          {cocktail.strMeasure3}
          {cocktail.strIngredient3}
        </li>
        <li>
          {cocktail.strMeasure4}
          {cocktail.strIngredient4}
        </li>
        <li>
          {cocktail.strMeasure5}
          {cocktail.strIngredient5}
        </li>
      </ul>
      <h1>Instructions:</h1>
      <p>{cocktail.strInstructions}</p>
    </section>
  );
};

export default CocktailDetails;
