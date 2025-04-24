import { useEffect } from 'react';
import AOS from 'aos';
import Carousel from '../components/Carousel';
import NewsCards from '../components/NewsCards';
import CorporateSection from '../components/CorporateSection';
import ContributionSection from '../components/ContributionSection';
import RegisterSection from '../components/RegisterSection';

export default function Home() {
  useEffect(() => {
    AOS.refresh();
  });

  return (
    <main id="main">
      <Carousel />
      <div data-aos="fade-up">
        <NewsCards />
      </div>
      <div data-aos="fade-up" data-aos-delay="100">
        <CorporateSection />
      </div>
      <div data-aos="fade-up" data-aos-delay="200">
        <NewsCards />
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
