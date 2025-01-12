import { useState } from 'react';
import { useAppSelector } from '../../utils/hooks/reduxHooks';
import { LoginForm } from '../LoginForm/LoginForm';
import './styles/NavMenu.css';

export const NavMenu = () => {
  const user = useAppSelector(state => state.auth.user);
  const [isLoginFormVisible, setLoginFormVisible] = useState(false);

  console.log('user: ', user);

  const toggleLoginForm = () => {
    if (!user) {
      if (!isLoginFormVisible) {
        setLoginFormVisible(true);
      } else {

      }
    }
  };

  return (
    <div className='navmenu'>
      { !user && isLoginFormVisible &&
        <LoginForm />      
      }

      <ul>
        <li onClick={toggleLoginForm}>{user?.username || 'Login'}</li>
        <li>Settings</li>
        <li>Help</li>
      </ul>

    </div>
  )
}