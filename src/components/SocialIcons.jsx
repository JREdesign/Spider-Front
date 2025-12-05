// Importaciones necesarias de React y React-Icons
import { FaLinkedin, FaTwitter, FaInstagram, FaYoutube, FaFacebook } from 'react-icons/fa';
import 'boxicons';


// Componente SocialIcons
const SocialIcons = () => {
  return (
        <div className="flex items-center space-x-4">
      <a href="https://www.linkedin.com/company/factor%C3%ADaf5/mycompany/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange">
        <FaLinkedin className="h-5 w-5" />
      </a>
      <a href="https://twitter.com/factoriaf5" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange">
        <FaTwitter className="h-5 w-5" />
      </a>
      <a href="https://www.instagram.com/factoria_f5/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange">
        <FaInstagram className="h-5 w-5" />
      </a>
      <a href="https://www.youtube.com/channel/UCazHbN7ChOJxRXW0-K1zczw?reload=9" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange">
        <FaYoutube className="h-5 w-5" />
      </a>
      <a href="https://www.facebook.com/factoriaf5/" target="_blank" rel="noopener noreferrer" className="text-black hover:text-orange">
        <FaFacebook className="h-5 w-5" />
      </a>
    </div>
  );
};

export default SocialIcons;


