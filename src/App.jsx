import { Outlet } from "react-router-dom";
import MenuPart from "./components/common/menu/MenuPart";

function App() {
  return (
    <div>
      <MenuPart />
      <Outlet />
    </div>
  );
}

export default App;
