import "../styles/Home.css";
import RandomCocktail from "../components/RandomCocktail";
import Footer from "../components/Footer";

export function Home() {
  return (
    <main className="home-main">
      <RandomCocktail />
      <Footer />
    </main>
  );
}
