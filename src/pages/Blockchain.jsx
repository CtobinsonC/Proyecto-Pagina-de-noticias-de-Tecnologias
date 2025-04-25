// Importa React, el hook personalizado y el componente de cards
import React from "react";
import useFetch from "../useFetch";
import NewsCards from "../components/NewsCards";

// URL del feed RSS de noticias sobre blockchain (CoinDesk)
const RSS_URL = "https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml";

// Función para intentar extraer la imagen de la noticia
function extractImage(noticia) {
  if (noticia.image) return noticia.image;
  if (noticia.enclosure && noticia.enclosure.link) return noticia.enclosure.link;
  if (noticia.thumbnail) return noticia.thumbnail;
  if (noticia.description) {
    const imgMatch = noticia.description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch && imgMatch[1]) return imgMatch[1];
  }
  return "/img/news4.jpg";
}

export default function Blockchain() {
  // Usa el hook personalizado para obtener las noticias del feed RSS
  const { data: noticias, loading, error } = useFetch(RSS_URL);

  // Transforma las noticias del RSS al formato que espera NewsCards
  const noticiasCards = (noticias || []).map(noticia => ({
    title: noticia.title,
    description: noticia.description,
    url: noticia.link,
    urlToImage: extractImage(noticia)
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
