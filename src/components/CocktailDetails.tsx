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
  strMeasure1: string; // mått
  strMeasure2: string;
  strMeasure3: string;
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

  if (!cocktail) return <p>Loading...</p>;

  return (
    <section>
      <h1>{cocktail.strDrink}</h1>
      <img src={cocktail.strDrinkThumb} alt={cocktail.strDrink} />
      <p>Type: {cocktail.strAlcoholic}</p>
      <ul>
        <li>{cocktail.strIngredient1}</li>
        <li>{cocktail.strIngredient2}</li>
        <li>{cocktail.strIngredient3}</li>
        <li>{cocktail.strIngredient4}</li>
      </ul>
      <p>Instructions: {cocktail.strInstructions}</p>
    </section>
  );
};

export default CocktailDetails;
