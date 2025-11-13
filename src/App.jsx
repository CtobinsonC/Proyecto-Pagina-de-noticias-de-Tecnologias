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
import useFetch from './useFetch';
import NewsCards from './components/NewsCards';
import Carousel from './components/Carousel';

// CAMBIO: Usamos el custom hook useFetch para obtener las noticias de la API
function App() {
  // CAMBIO: Obtenemos los artículos de la API usando el custom hook
  const { article } = useFetch('https://newsapi.org/v2/top-headlines?country=us&apiKey=85385ed173344947892195b0f1bf39b8');

  const location = useLocation();
  const hideHeader = location.pathname === '/login';

  return (
    <>
      {!hideHeader && <Header />}
      {/* Solo mostramos el carrusel y las noticias en la ruta principal ("/") usando Home */}
      <Routes>
        <Route path="/" element={<Home article={article || []} />} />
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
