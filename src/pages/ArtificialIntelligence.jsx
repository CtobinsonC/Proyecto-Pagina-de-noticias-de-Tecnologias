import React from "react";
import useFetch from "../useFetch";
import NewsCards from "../components/NewsCards";

const RSS_URL = "https://news.ycombinator.com/rss";

// Array de imágenes por defecto
const DEFAULT_IMAGES = [
  '/img/pexels-mikhail-nilov-9242891.jpg',
  '/img/pexels-pachon-in-motion-426015731-30547596.jpg',
  '/img/pexels-pavel-danilyuk-8438874.jpg',
  '/img/pexels-sanketgraphy-16380905.jpg',
  '/img/pexels-sanketgraphy-16629368.jpg',
  '/img/pexels-slaytinaaaa-4619829.jpg',
  '/img/pexels-yaroslav-shuraev-7688551.jpg'
];

// Función para obtener una imagen por defecto aleatoria
function getRandomDefaultImage() {
  return DEFAULT_IMAGES[Math.floor(Math.random() * DEFAULT_IMAGES.length)];
}

export default function ArtificialIntelligence() {
  // RSS URL para IA
  const { data: noticias, loading, error } = useFetch(RSS_URL);

  const noticiasCards = (noticias || [])
    .filter(noticia => noticia.title && noticia.title.trim().length > 0)
    .map(noticia => ({
      title: noticia.title,
      description: noticia.description || '',
      url: noticia.link || noticia.url || '#',
      urlToImage: noticia.urlToImage
    }));

  return (
    <main className="container mt-5">
      <h1>Inteligencia Artificial</h1>
      <p>Contenido relacionado con IA y avances recientes.</p>
      {loading && <p>Cargando noticias...</p>}
      {error && <p>Error al cargar noticias: {error}</p>}
      {!loading && !error && noticiasCards.length > 0 && (
        <NewsCards article={noticiasCards} />
      )}
    </main>
  );
}
