import logoPath from '/logore-white.png'; 
import { Link } from 'react-router-dom';

const FooterLogo = () => {
  return (
    <div className="footer-logo">
      <Link to="/">
        <img src={logoPath} alt="Logo" className="w-44" />
      </Link>
    </div>
  );
};

export default FooterLogo;
