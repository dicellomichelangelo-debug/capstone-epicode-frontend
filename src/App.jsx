import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbarc from "./components/Navbar/NavBarc";
import Sidebar from "./components/Sidebar/Sidebar";

function App() {
  return (
    <>
      <Navbarc />
      <Routes>
        <Route element={<Sidebar />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
