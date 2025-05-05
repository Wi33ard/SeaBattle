import { Provider } from "react-redux";
import { store } from "./store";
import IntroScreen from "./components/IntroScreen/IntroScreen";
import "./App.css";

const App = () => {
  return (
    <Provider store={store}>
      <IntroScreen />
    </Provider>
  );
}

export default App;
