
import classNames from 'classnames';

const IconBurger = ({ toggleMenu, isOpen }) => {
  return (
    <div onClick={toggleMenu} className={classNames(`tham tham-e-squeeze tham-w-6`, { 'tham-active': isOpen })}>
      <div className="tham-box">
        <div className="tham-inner" />
      </div>
    </div>
  );
};

export default IconBurger;

