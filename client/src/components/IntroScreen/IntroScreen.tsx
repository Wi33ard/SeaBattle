import { useCallback, useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import logo from "../../assets/icons/cruiser-military.svg";
import { Outlet } from "react-router-dom";
import { useAppSelector } from "../../utils/hooks/reduxHooks";


const IntroScreen = () => {
  const isLoggedIn = Boolean(useAppSelector((state) => state.auth.user));
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  
  const handleShowLogin = useCallback(() => {
    setIsLoginVisible(true);
  }, []);

  if (isLoggedIn) {
    return <Outlet />
  }

  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>SEA BATTLE</h1>
      { isLoginVisible ? (
        <LoginForm />
      ) : (
        <button onClick={handleShowLogin}>⚓Enter</button>
      )}
    </header>
    <main></main>
  </div>
  )
}

export default IntroScreen;
