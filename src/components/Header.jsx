import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Logo from './Logo';
import NavBar from './NavBar';
import DarkModeSwitch from './DarkModeSwitch';
import IconBurger from './IconBurger'; // Asegúrate de que la ruta sea correcta

const Header = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const navigate = useNavigate();

    const toggleMenu = () => {
        setMenuOpen(!isMenuOpen);
    };

    const handleLogout = () => {
        console.log('Intentando cerrar sesión');
        localStorage.clear();
        navigate('/welcome');
    };

    return (
        <header className="sticky top-0 bg-white z-50 dark:bg-gray800 text-black dark:text-white px-4 py-2">
            <div className="flex justify-between items-center">
                <div className="flex items-center">
                    <Logo />
                </div>
                <div className="flex items-center space-x-4 md:hidden"> {/* Ajusta la clase flex y espacio */}
                    <IconBurger isOpen={isMenuOpen} toggleMenu={toggleMenu} />
                    <DarkModeSwitch />
                </div>
                <div className="hidden md:flex md:items-center md:space-x-4 flex-grow justify-center">
                    <NavBar />
                </div>
                <div className="hidden md:flex md:items-center md:space-x-4">
                    <DarkModeSwitch />
                    <button
                        className="group flex items-center justify-start w-11 h-11 bg-orange dark:bg-gray-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1"
                        onClick={handleLogout}
                    >
                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                            <svg fill="white" viewBox="0 0 512 512" className="w-4 h-4">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9v-62.1h-128c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128C0 75 43 32 96 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                                </path>
                            </svg>
                        </div>
                        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            Salir
                        </div>
                    </button>
                </div>
            </div>
            {isMenuOpen && (
                <div className="mt-2 md:hidden">
                    <NavBar />
                    <button
                        className="group flex items-center justify-start w-11 h-11 bg-gray-600 rounded-full cursor-pointer relative overflow-hidden transition-all duration-200 shadow-lg hover:w-32 hover:rounded-lg active:translate-x-1 active:translate-y-1 mt-4"
                        onClick={handleLogout}
                    >
                        <div className="flex items-center justify-center w-full transition-all duration-300 group-hover:justify-start group-hover:px-3">
                            <svg fill="white" viewBox="0 0 512 512" className="w-4 h-4">
                                <path d="M377.9 105.9L500.7 228.7c7.2 7.2 11.3 17.1 11.3 27.3s-4.1 20.1-11.3 27.3L377.9 406.1c-6.4 6.4-15 9.9-24 9.9c-18.7 0-33.9-15.2-33.9-33.9v-62.1h-128c-17.7 0-32-14.3-32-32v-64c0-17.7 14.3-32 32-32h128v-62.1c0-18.7 15.2-33.9 33.9-33.9c9 0 17.6 3.6 24 9.9zM160 96H96c-17.7 0-32 14.3-32 32v256c0 17.7 14.3 32 32 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32H96c-53 0-96-43-96-96V128C0 75 43 32 96 32h64c17.7 0 32 14.3 32 32s-14.3 32-32 32z">
                                </path>
                            </svg>
                        </div>
                        <div className="absolute right-5 transform translate-x-full opacity-0 text-white text-lg font-semibold transition-all duration-300 group-hover:translate-x-0 group-hover:opacity-100">
                            Salir
                        </div>
                    </button>
                </div>
            )}
        </header>
    );
};

export default Header;
