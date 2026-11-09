import { HashRouter } from "react-router";
import { InventarioProvider } from "./context/InventarioContext";
import AppRoutes from "./routes/AppRoutes";

function App() {
  return (
    <InventarioProvider>
      <HashRouter>
        <AppRoutes />
      </HashRouter>
    </InventarioProvider>
  );
}

export default App;