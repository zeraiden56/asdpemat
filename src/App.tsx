import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import QuemSomos from './pages/QuemSomos';
import Servicos from './pages/Servicos';
import Presidencia from './pages/Presidencia';
import Ferramentas from './pages/Ferramentas';
import FAQ from './pages/FAQ';
import Ajuda from './pages/Ajuda';
import Membro from './pages/Membro';
import Admin from './pages/Admin'; // Ensure this path is correct and the file exists
import Login from './Login';
import Layout from './components/Layout'; // Certifique-se de que o caminho está correto

function App() {
  return (
    <Router>
      {/* Layout aplica-se a TODAS as páginas */}
      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/quem-somos" element={<QuemSomos />} />
          <Route path="/servicos" element={<Servicos />} />
          <Route path="/presidencia" element={<Presidencia />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/ajuda" element={<Ajuda />} />
          <Route path="/membro" element={<Membro />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Layout>
    </Router>
  );
}

export default App;