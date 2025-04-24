import { useEffect } from 'react';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import '../index.css';

const slides = [
  '/img/wp3205240.jpg',
  '/img/web_designing_palakkad_slide_1.jpg',
  '/img/99-994369_artificial-intelligence-wallpaper-1080p.jpg',
];

export default function Carousel() {
  useEffect(() => {}, []);

  return (
    <div className="container-fluid align-items-center">
      <div className="row">
        <div className="col-12 p-0">
          <div id="carouselExample" className="carousel slide position-relative" data-bs-ride="carousel" data-bs-pause="false">
            <div className="carousel-inner">
              {slides.map((img, idx) => (
                <div
                  className={`carousel-item${idx === 0 ? ' active' : ''}`}
                  key={idx}
                >
                  <img src={img} className="d-block w-100" alt="..." />
                </div>
              ))}
            </div>
            {/* Overlay absolutamente posicionado sobre las imágenes */}
            <div className="overlay-carousel">
              <div className="container mt-4">
                <div className="row align-items-center">
                  <div className="col-md-6">
                    <h1>Novedades del mundo Tech</h1>
                    <p className="d-none d-md-block">
                      El mundo esta cambiado es la oportunidad perfecta <br />
                      para aprender las nuevas tecnologias que se necesitan <br />
                      para llevar tu empresa a otro nivel
                    </p>
                    <a href="#" className="btn btn-outline-light">Conoce mas</a>
                  </div>
                </div>
              </div>
            </div>
            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
              <span className="carousel-control-prev-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
              <span className="carousel-control-next-icon" aria-hidden="true"></span>
              <span className="visually-hidden">Next</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
