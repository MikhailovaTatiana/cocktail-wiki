import '../styles/DrinkInfo.css'

export function DrinkInfo() {

    return (
        <main className='info-main'>
            <h1 className='info-header'>Drink Information</h1>
            <section className="info-card">
                <aside className='info-aside info-right'>
                    <p>Name</p>
                    <img className='info-img' src="src\assets\test-img-drink.png" alt="drink" />
                    <p># # #</p>
                    <p>Category</p>
                </aside>
                <aside className='info-aside info-left'>
                    <img className="star-in-info" src="src\assets\icons8-star-50.png" alt="star" />
                    <h4>Ingrediens</h4>
                    <ul>
                        <li>gdfg</li>
                        <li>hdgfj</li>
                        <li>jgj</li>
                    </ul>
                    <h4>Glass:</h4>
                    <p>Wine glass</p>
                </aside>
            </section>
        </main>
    )
}
