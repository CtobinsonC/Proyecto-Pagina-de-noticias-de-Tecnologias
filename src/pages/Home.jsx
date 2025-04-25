import React, { useMemo } from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import Carousel from '../components/Carousel';
import NewsCards from '../components/NewsCards';
import CorporateSection from '../components/CorporateSection';
import ContributionSection from '../components/ContributionSection';
import RegisterSection from '../components/RegisterSection';
import useFetch from "../useFetch";

// Función para intentar extraer la imagen de la noticia
function extractImage(noticia) {
  if (noticia.image) return noticia.image;
  if (noticia.enclosure && noticia.enclosure.link) return noticia.enclosure.link;
  if (noticia.thumbnail) return noticia.thumbnail;
  if (noticia.description) {
    const imgMatch = noticia.description.match(/<img[^>]+src=["']([^"'>]+)["']/i);
    if (imgMatch && imgMatch[1]) return imgMatch[1];
  }
  return null;
}

export default function Home() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  // Obtener noticias de cada página
  const { data: aiNews } = useFetch("https://venturebeat.com/category/ai/feed/");
  const { data: mlNews } = useFetch("https://towardsdatascience.com/feed");
  const { data: startupNews } = useFetch("https://techcrunch.com/startups/feed/");
  const { data: blockchainNews } = useFetch("https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml");
  const { data: webdevNews } = useFetch("https://www.smashingmagazine.com/feed/");

  // Unir todas las noticias y filtrar solo las que tienen imagen válida
  const allNews = useMemo(() => {
    const joined = [
      ...(aiNews || []),
      ...(mlNews || []),
      ...(startupNews || []),
      ...(blockchainNews || []),
      ...(webdevNews || [])
    ];
    return joined
      .map(noticia => ({
        title: noticia.title,
        description: noticia.description,
        url: noticia.link,
        urlToImage: extractImage(noticia)
      }))
      .filter(noticia => noticia.urlToImage); // Solo con imagen válida
  }, [aiNews, mlNews, startupNews, blockchainNews, webdevNews]);

  // Solo mostrar las primeras 8 noticias con imagen
  const noticiasCards = allNews.slice(0, 8);

  return (
    <main id="main">
      <Carousel />
      <div id="news-section" data-aos="fade-up">
        {noticiasCards.length === 0 && <p>No hay noticias con imagen para mostrar.</p>}
        {noticiasCards.length > 0 && <NewsCards article={noticiasCards} />}
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <CorporateSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <ContributionSection />
      </div>
      {/* Quitamos el id de register-section para revertir el cambio anterior */}
      <div data-aos="fade-up" data-aos-delay="400">
        <RegisterSection />
      </div>
    </main>
  );
}
