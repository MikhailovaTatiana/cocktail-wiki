import '../styles/Search.css'

export function Search() {
    return (
        <main className="search-main">
            <h1 className='search-header'>Search Result</h1>
            <section className='result-cards'>
                <aside className="search-card">
                    <div className='images'>
                        <img className='drink-img' src="src\assets\test-img-drink.png" alt="drink" />
                        <img className='star-img' src="src\assets\icon-star.svg" alt="star" />
                    </div>
                    <h2>Old Fashioned</h2>
                    <button className='search-btn-card'>See more</button>
                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <aside className="search-card">

                </aside>
                <div className='pagination'>
                    <span>1</span>
                    <span>2</span>
                    <span>3</span>
                </div>
            </section>
        </main>
    )
}