// Importa React, el hook personalizado y el componente de cards
import React from "react";
import useFetch from "../useFetch";
import NewsCards from "../components/NewsCards";

// URL del feed RSS de noticias sobre blockchain (CoinDesk)
const RSS_URL = "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml";

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

let defaultImageCounter = 0;

// Función para obtener una imagen por defecto (ciclando por índice)
function getNextDefaultImage() {
  const image = DEFAULT_IMAGES[defaultImageCounter % DEFAULT_IMAGES.length];
  defaultImageCounter++;
  return image;
}

export default function Blockchain() {
  // Usa el hook personalizado para obtener las noticias del feed RSS
  const { data: noticias, loading, error } = useFetch(RSS_URL);

  // Transforma las noticias del RSS al formato que espera NewsCards
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
      <h1>Blockchain</h1>
      <p>Contenido relacionado con blockchain y tecnologías descentralizadas.</p>

      {/* Muestra mensaje de carga */}
      {loading && <p>Cargando noticias...</p>}

      {/* Muestra mensaje de error si ocurre */}
      {error && <p>Error al cargar noticias: {error}</p>}

      {/* Renderiza las noticias en cards si hay noticias */}
      {!loading && !error && noticiasCards.length > 0 && (
        <NewsCards article={noticiasCards} />
      )}
    </main>
  );
}
