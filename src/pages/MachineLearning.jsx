import React from "react";
import useFetch from "../useFetch";
import NewsCards from "../components/NewsCards";

// RSS URL para Machine Learning (ejemplo: Towards Data Science)
const RSS_URL = "https://towardsdatascience.com/feed";

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

export default function MachineLearning() {
  const { data: noticias, loading, error } = useFetch(RSS_URL);

  const noticiasCards = (noticias || []).map(noticia => ({
    title: noticia.title,
    description: noticia.description,
    url: noticia.link,
    urlToImage: extractImage(noticia)
  }));

  return (
    <main className="container mt-5">
      <h1>Machine Learning</h1>
      <p>Contenido relacionado con Machine Learning y novedades del área.</p>
      {loading && <p>Cargando noticias...</p>}
      {error && <p>Error al cargar noticias: {error}</p>}
      {!loading && !error && noticiasCards.length > 0 && (
        <NewsCards article={noticiasCards} />
      )}
    </main>
  );
}
