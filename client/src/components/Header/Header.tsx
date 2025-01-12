import { LoginForm } from '../LoginForm/LoginForm';
import { NavMenu } from '../NavMenu/Navmenu';
import './styles/Header.css';

export const Header = () => {
  return (
    <div className='header'>
      <div className="title">
        Sea battle
      </div>
      <div className='navbar'>
        <NavMenu />
      </div>
    </div>
  )
}
