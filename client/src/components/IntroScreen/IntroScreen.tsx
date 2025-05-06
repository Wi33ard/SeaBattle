import { useCallback, useState } from "react";
import { LoginForm } from "../LoginForm/LoginForm";
import { useAppSelector } from "../../utils/hooks/reduxHooks";
import { useNavigate } from "react-router-dom";
import logo from "../../assets/icons/cruiser-military.svg";


const IntroScreen = () => {
  const [isLoginVisible, setIsLoginVisible] = useState(false);
  const username = useAppSelector((state) => state.auth.user?.name);
  const navigate = useNavigate();
  
  const handleEnter = useCallback(() => {
    if (!username) {
      setIsLoginVisible(true);
    } else {
      navigate('/room');
    }
  }, [navigate, username]);


  return (
    <div className="App">
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <h1>SEA BATTLE</h1>
      { isLoginVisible ? (
        <LoginForm />
      ) : (
        <button onClick={handleEnter}>⚓Enter</button>
      )}
    </header>
    <main></main>
  </div>
  )
}

export default IntroScreen;
