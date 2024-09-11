import "../styles/Navbar.css";
import starIcon from '../assets/icons8-star-50.png'
import { Link } from 'react-router-dom';


const Navbar = () => {
  return (
    <nav className="navbar">
        <Link to="/" className="navbar-brand">The CocktailDB</Link>
      <ul className="navbar-list">
      <li >
          <a href="#search" className="navbar-link favorite-link">Favorites  <img src={starIcon} alt="Star" className="star-icon" /></a>
        </li>
        <li >
          <a href="#search" className="navbar-link">Search</a>
       
          <input type="text" placeholder="Search..." className="search-input" />
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
