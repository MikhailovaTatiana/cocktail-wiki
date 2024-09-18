import "../styles/Ingredient.css";

export function Ingredient() {
  return (
    <main className="ingredient-main">
      <h1 className="ing-header">Ingredient</h1>
      <section className="ingredient-card">
        <aside className="ingredient-aside ingredient-right">
          <h1 className="ingredient-header">Lime</h1>
          <img className="ingredient-image" src="src/assets/lime.png" />
          <p>Type: fruit</p>
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
        {/*         <section className="grid-drinks">
          <article className="card">
            <img className="drink-img" src="src/assets/test-img-drink.png" />
            <h1>Aperol Spritz</h1>
          </article>

          <article className="card">
            <img className="drink-img" src="src/assets/test-img-drink.png" />
            <h1>Aperol Spritz</h1>
          </article>

          <article className="card">
            <img className="drink-img" src="src/assets/test-img-drink.png" />
            <h1>Aperol Spritz</h1>
          </article>
        </section> */}
      </section>
    </main>
  );
}
