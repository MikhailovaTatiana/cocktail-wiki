import '../styles/NotFound.css';
import React, { useEffect, useState } from 'react';
import { Player } from '@lottiefiles/react-lottie-player';
import Animation1 from '../assets/Animation1.json';
import Animation2 from '../assets/Animation2.json';
import Animation3 from '../assets/Animation3.json';
import { Link } from 'react-router-dom';

const NotFoundPage: React.FC = () => {
  const animations = [Animation1, Animation2, Animation3];
  const [randomAnimation, setRandomAnimation] = useState(animations[0]);

  useEffect(() => {
    // Randomly select an animation on page load
    const randomIndex = Math.floor(Math.random() * animations.length);
    setRandomAnimation(animations[randomIndex]);
  }, []);

  return (
    <div className="error-main">
      <blockquote className="quote">
        "I don't have a drinking problem, 'cept when I can't get a drink." - Tom Waits
      </blockquote>

     {/* Display random animation */}
     <Player
        autoplay
        loop
        src={randomAnimation}
        style={{ height: '300px', width: '300px' }}
      />

      <Link to="/" className="homeLink">Take Me Home</Link>
    </div>
  );
};

export default NotFoundPage;
