
import { FaLinkedinIn, FaTwitter, FaInstagram, FaYoutube, FaFacebookF } from 'react-icons/fa';

const SocialMedia = () => {
  return (
    <div className="flex space-x-4">
      <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray800">
        <FaLinkedinIn size="24px" aria-label="LinkedIn" />
      </a>
      <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray800">
        <FaTwitter size="24px" aria-label="Twitter" />
      </a>
      <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray800">
        <FaInstagram size="24px" aria-label="Instagram" />
      </a>
      <a href="https://www.youtube.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray800">
        <FaYoutube size="24px" aria-label="YouTube" />
      </a>
      <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray800">
        <FaFacebookF size="24px" aria-label="Facebook" />
      </a>
    </div>
  );
};

export default SocialMedia;

