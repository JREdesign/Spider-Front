import { useState } from 'react';
import DarkModeToggle from './DarkModeToggle';

// Componente LanguageSelector
const LanguageSelector = () => {
  // Estado para manejar el idioma activo
  const [activeLanguage, setActiveLanguage] = useState('ES');

  // Función para cambiar el idioma activo
  const handleLanguageChange = (language) => {
    setActiveLanguage(language);
  };

  return (
    <div className="flex items-center">
      <button 
        className={`text-sm font-bold px-2 py-1 ${activeLanguage === 'ES' ? 'bg-orange text-white rounded-md' : 'bg-white text-black'}`}
        onClick={() => handleLanguageChange('ES')}
      >
        ES
      </button>
      <button 
        className={`text-sm font-bold px-2 py-1 ml-2 ${activeLanguage === 'CA' ? 'bg-orange text-white rounded-md' : 'bg-white text-black'}`}
        onClick={() => handleLanguageChange('CA')}
      >
        CA
      </button>
      <DarkModeToggle />
    </div>
  );
};

export default LanguageSelector;


