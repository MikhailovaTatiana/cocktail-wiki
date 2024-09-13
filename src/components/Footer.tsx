import React from 'react';
import "../styles/Footer.css";

export function Footer() {
  // Function to capitalize the first letter of the month
  const capitalizeFirstLetter = (string: string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  // Function to get current date and format it
  const getCurrentDate = () => {
    const today = new Date();
    const day = today.getDate();
    let month = today.toLocaleString('default', { month: 'long' });

    // Capitalize the first letter of the month
    month = capitalizeFirstLetter(month);
    
    const year = today.getFullYear();

    return `, ${month} ${day}, ${year}`;
  };

  return (
    <footer>
      <p>© Super Knights</p>
      <p className="date">{getCurrentDate()}</p>
    </footer>
  );
}

export default Footer;

