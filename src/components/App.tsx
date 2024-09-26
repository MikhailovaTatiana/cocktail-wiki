import '../styles/App.css';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { FavoritesProvider } from '../context/FavoritesContext';

function App() {
  return (
    <>
      <FavoritesProvider>
        <Navbar />
        <Outlet />
      </FavoritesProvider>
    </>
  );
}

export default App;
