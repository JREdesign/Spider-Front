import { useChat } from '../context/ChatContext';

const NavBar = () => {
  const { toggleChat, setUserData } = useChat();
  const token = localStorage.getItem("token");
  const user = token ? JSON.parse(atob(token.split(".")[1])) : null;

  const handleChatToggle = (e) => {
    e.preventDefault();
    setUserData(user);
    toggleChat();
  };

  const handleScroll = (e, id) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="flex gap-2 flex-row justify-center items-center bg-white dark:bg-gray800 text-black dark:text-white font-bold">
      <ul className="flex gap-4 justify-center flex-col md:flex-row md:justify-between md:items-center ">
        <li>
          <a
            href="/"
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            HOME
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => handleScroll(e, 'mapa-empleo')}
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            MAPA DEL EMPLEO
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => handleScroll(e, 'datos-estadisticos')}
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            ESTADÍSTICAS
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => handleScroll(e, 'portales-rastreados')}
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            PORTALES RASTREADOS
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={(e) => handleScroll(e, 'contacto')}
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            CONTACTO
          </a>
        </li>
        {user && user.role === "admin" && (
          <li>
            <a
              href="/dashboard"
              className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-yellow-500"
            >
              <img src="/admin-icon.svg" alt="Admin Icon" className="w-6 h-6 dark:invert" />
            </a>
          </li>
        )}
        <li>
          <a
            href="/profile"
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            <img src="/profile.svg" alt="Profile Icon" className="w-6 h-6 dark:invert" />
          </a>
        </li>
        <li>
          <a
            href="#"
            onClick={handleChatToggle}
            className="hover:text-orange transition-colors duration-300 hover-underline-animation dark:hover:text-orange dark:text-orange100"
          >
            <img src="/chatbot.png" alt="Chatbot Icon" className="w-6 h-6 dark:invert" />
          </a>
        </li>
      </ul>
    </nav>
  );
};

export default NavBar;
