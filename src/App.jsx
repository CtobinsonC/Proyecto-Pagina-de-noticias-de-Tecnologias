import { Routes, Route, useLocation } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './pages/Login';
import Home from './pages/Home';
import WebDeveloper from './pages/WebDeveloper';
import MachineLearning from './pages/MachineLearning';
import Startup from './pages/Startup';
import Blockchain from './pages/Blockchain';
import ArtificialIntelligence from './pages/ArtificialIntelligence';
import './App.css';

function App() {
  const location = useLocation();
  const hideHeader = location.pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/web-developer" element={<WebDeveloper />} />
        <Route path="/machine-learning" element={<MachineLearning />} />
        <Route path="/startup" element={<Startup />} />
        <Route path="/blockchain" element={<Blockchain />} />
        <Route path="/artificial-intelligence" element={<ArtificialIntelligence />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
