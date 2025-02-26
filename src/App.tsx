import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import QuemSomos from "./pages/QuemSomos";
import Servicos from "./pages/Servicos";
import Presidencia from "./pages/Presidencia";
import Ferramentas from "./pages/Ferramentas";
import FAQ from "./pages/FAQ";
import Ajuda from "./pages/Ajuda";
import AssocieSe from "./pages/AssocieSe";
import Login from "./pages/Login";
import Admin from "./pages/Admin";
import PrivateRoute from "./components/PrivateRoute";
import Layout from "./components/Layout";

function App() {
  return (
    <Router>
      <Routes>
        {/* 🔹 Aplicando o Layout para todas as páginas públicas */}
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/presidencia" element={<Presidencia />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/associe-se" element={<AssocieSe />} />
          <Route path="/login" element={<Login />} />
        </Route>

        {/* 🔒 Rotas protegidas dentro do Layout */}
        <Route element={<PrivateRoute />}>
          <Route element={<Layout />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
