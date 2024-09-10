import '../styles/Home.css'

export function Home() {
    return (
        <main className="home-main">
            <button className='random-btn'>GET RANDOM DRINK</button>
            <section className="card">
                <img className='img-card' src="src\assets\test-img-drink.png" alt="drink" />
                <aside className='aside-card'>
                    <img className='star' src="src\assets\icons8-star-50.png" alt="star" />
                    <h2 className='drink-name'>Aperol spritz</h2>
                    <button className='home-btn-card'>SEE MORE</button>
                </aside>
            </section>
        </main>
    )
}