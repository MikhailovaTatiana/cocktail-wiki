import { useNavigate } from "react-router-dom";

export function Favorite() {
  const navigate = useNavigate();

  return (
    <main className="favorite-main">
      <h1>Favorites</h1>
      <button onClick={() => navigate(-1)} className="goback-btn">
        Go back
      </button>
    </main>
  );
}
