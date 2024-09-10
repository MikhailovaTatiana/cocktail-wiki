import '../styles/Home.css'

export function Home() {
    return (
        <main className="home-main">
            <button className='random-btn'>RANDOM DRINK</button>
            <section className="card">
                <img className='img-card' src="src\assets\test-img-drink.png" alt="" />
                <aside className='aside-card'>
                    <p className='star'>*</p>
                    <h2>Aperol spritz</h2>
                    <button>SEE MORE</button>
                </aside>
            </section>
        </main>
    )
}