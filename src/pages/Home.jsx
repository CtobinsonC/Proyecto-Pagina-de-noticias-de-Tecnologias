import { useEffect } from 'react';
import AOS from 'aos';
import Carousel from '../components/Carousel';
import NewsCards from '../components/NewsCards';
import CorporateSection from '../components/CorporateSection';
import ContributionSection from '../components/ContributionSection';
import RegisterSection from '../components/RegisterSection';

export default function Home({ article = [] }) {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <main id="main">
      {/* Carrusel solo una vez arriba */}
      <Carousel />
      <div data-aos="fade-up">
        {/* Pasamos el prop article para mostrar las noticias correctas */}
        <NewsCards article={article} />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <CorporateSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="300">
        <ContributionSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="400">
        <RegisterSection />
      </div>
    </main>
  );
}
