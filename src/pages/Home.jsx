import React, { useMemo } from "react";
import { useEffect } from 'react';
import AOS from 'aos';
import Carousel from '../components/Carousel';
import NewsCards from '../components/NewsCards';
import CorporateSection from '../components/CorporateSection';
import ContributionSection from '../components/ContributionSection';
import RegisterSection from '../components/RegisterSection';
import useFetch from "../useFetch";

export default function Home() {
  useEffect(() => {
    AOS.refresh();
  }, []);

  // Obtener noticias solo de Blockchain (que tienen imágenes válidas)
  const { data: blockchainNews } = useFetch("https://www.coindesk.com/arc/outboundfeeds/rss/?outputType=xml");

  // Unir solo las noticias de blockchain
  const allNews = useMemo(() => {
    return (blockchainNews || [])
      .filter(noticia => noticia.title && noticia.title.trim().length > 0)
      .map(noticia => ({
        title: noticia.title,
        description: noticia.description || '',
        url: noticia.link || noticia.url || '#',
        urlToImage: noticia.urlToImage
      }));
  }, [blockchainNews]);

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
