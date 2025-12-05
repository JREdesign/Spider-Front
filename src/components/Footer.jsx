import FooterLogo from './FooterLogo';
import SocialMedia from './SocialMedia';
import Copyright from './Copyright';

const Footer = () => {
  return (
    <footer className="bg-orange text-white p-5 dark:bg-gray800">
      <div className="flex flex-col md:flex-row md:justify-between">
        <div className="mb-4 md:mb-0">
          <FooterLogo />
        </div>
        <div className="mt-4 md:mb-0">
          <SocialMedia />
        </div>
      </div>
      <div className="text-center border-t border-white pt-4 mt-4">
        <Copyright />
      </div>
    </footer>
  );
};

export default Footer;
