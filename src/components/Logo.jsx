// Importación de React y react-router-dom
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import logo from '../../public/logore.jpg';
import logoreWhite from '../../public/logore-white.png';

const Logo = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const handleThemeChange = () => {
      setIsDarkMode(document.documentElement.classList.contains('dark'));
    };

    // Set initial state
    handleThemeChange();

    // Add event listener for theme changes
    const observer = new MutationObserver(handleThemeChange);
    observer.observe(document.documentElement, { attributes: true });

    return () => observer.disconnect();
  }, []);

  return (
    <Link to="/">
      <img
        src={isDarkMode ? logoreWhite : logo}
        alt="Logo"
        className="h-16" // Ajusta la clase de TailwindCSS según sea necesario
      />
    </Link>
  );
};

export default Logo;
