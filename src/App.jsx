import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./components/Home/Home";
import Navbarc from "./components/Navbar/NavBarc";
import Sidebar from "./components/Sidebar/Sidebar";
import ProductDetail from "./components/ProductDetail/ProductDetail";
import Configuratore from "./components/Configuratore/Configuratore";
import Comparatore from "./components/Comparatore/Comparatore";
import Carrello from "./components/Carrello/Carrello";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbarc />
      <main className="flex-grow-1">
        <Routes>
          <Route element={<Sidebar />}>
            <Route path="/" element={<Home />} />
          </Route>
          <Route path="/prodotto/:id" element={<ProductDetail />} />
          <Route path="/configuratore" element={<Configuratore />} />
          <Route path="/comparatore" element={<Comparatore />} />
          <Route path="/cart" element={<Carrello />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
