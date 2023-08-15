import Layout from "./Components/Layout/Layout.js";
import { GameContextProvider } from "./Context/Game/GameContext.js";

function App() {
  return (
    <GameContextProvider>
      <Layout />
    </GameContextProvider>
  );
}

export default App;
