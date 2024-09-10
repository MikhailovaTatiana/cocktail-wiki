import "../styles/Navbar.css";


const Navbar = () => {
  return (
    <nav className="navbar">
      <p >The CocktailDB</p>
      <ul className="navbar-list">
      <li >
          <a href="#search" className="navbar-link">Favoriter</a>
        </li>
        <li >
          <a href="#search" className="navbar-link">Search</a>
        </li>
        <li >
          <input type="text" placeholder="Search..." className="search-input" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
