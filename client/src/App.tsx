import React, { useCallback, useState } from "react";
import logo from "./assets/icons/cruiser-military.svg";
import { Game } from "./components/Game/Game";
import { Provider } from "react-redux";
import { store } from "./store";
import "./App.css";

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogIn = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  if (isLoggedIn) {
    return (
      <Provider store={store}>
        <Game />
      </Provider>
    )
  }

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <h1>SEA BATTLE</h1>
        <button onClick={handleLogIn}>Enter</button>
      </header>
      <main></main>
    </div>
  );
}

export default App;
