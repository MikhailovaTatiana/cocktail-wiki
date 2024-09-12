import "../styles/Home.css";
import RandomCocktail from "../components/RandomCocktail";

export function Home() {
  return (
    <main className="home-main">
      <RandomCocktail />
    </main>
  );
}

// Exempel bild och text
/* /* export function Home() {
  return (
    <main className="home-main">
      <button className="random-btn">Random Drink</button>
      <section className="card">
        <img className="img-card" src="src\assets\test-img-drink.png" alt="drink" />
        <aside className="aside-card">
          <img className="star" src="src\assets\icons8-star-50.png" alt="star" />
          <h2 className="drink-name">Aperol spritz</h2>
          <button className="home-btn-card">SEE MORE</button>
        </aside>
      </section>
    </main>
  );
} */
